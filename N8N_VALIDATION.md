# N8N → Sanity Story Validation Rules

**Purpose:** Prevent n8n from publishing empty/partial stories to Sanity, which Google indexes as soft 404s and hurts the site's overall quality score.

The "Create Document" (or "Create or Update") Sanity node in your n8n workflow should run a **Function** node (or `IF` chain) immediately before the HTTP call to Sanity that validates every field below. If validation fails, the workflow should branch to a Stop & Error node (or send a Slack/email alert) and **not** push to Sanity.

---

## Field-by-field rules

| Field | Rule | Why |
|---|---|---|
| `title` | Required, `≥ 10` chars, `≤ 200` chars, no leading/trailing whitespace | Google truncates short titles in SERP; very long titles wrap awkwardly. |
| `slug.current` | Required, must match `/^[a-z0-9-]+$/`, must be unique in Sanity | Prevents 404s from broken slugs and duplicate-content issues. |
| `body` | Required, must contain **at least one** Portable Text `block` with non-empty text | Empty body = soft 404 once published. |
| `excerpt` | Optional, but if present `≥ 50` chars | Used for `<meta description>` and OG; short excerpts hurt CTR. |
| `mainImage` | Required (asset reference must resolve) | Stories without a hero image underperform in image search and social. |
| `publishedAt` | Required, valid ISO 8601, must be `≤ now()` | Future-dated posts confuse Google. |
| `categories` | At least one category required | Stories without categories don't show up in `/[slug]` category pages. |
| `author` | Required (must reference an existing author document) | Stories without authors can't link to an author page. |
| `tags` | Optional; if present, each must reference an existing tag | Otherwise the `/tag/[slug]` page returns 404. |
| `isBreaking` / `isFeatured` / `isTrending` etc. | Optional booleans, default `false` | — |

---

## Suggested n8n Function node

Drop this Function node **immediately before** your "Create Document" Sanity node. Wire its **Error** output to a Stop & Error node, and the **Continue** output to the Sanity node.

```javascript
// Input: the upstream node's JSON. Adjust $input to your node name.
const item = $input.first().json;

const errors = [];

// Title
const title = (item.title || '').trim();
if (title.length < 10) errors.push('title too short');
if (title.length > 200) errors.push('title too long');

// Slug
const slug = item.slug?.current || item.slug || '';
if (!/^[a-z0-9-]+$/.test(slug)) errors.push('slug invalid format');

// Body (Portable Text array)
const body = item.body || [];
const hasBlock = Array.isArray(body) && body.some(
  b => b._type === 'block' && Array.isArray(b.children) && b.children.some(
    c => (c.text || '').trim().length > 0
  )
);
if (!hasBlock) errors.push('body has no text blocks');

// Excerpt (optional)
if (item.excerpt && item.excerpt.length < 50) errors.push('excerpt too short');

// mainImage
if (!item.mainImage?.asset?._ref) errors.push('mainImage missing');

// publishedAt
const pub = item.publishedAt ? new Date(item.publishedAt) : null;
if (!pub || isNaN(pub.getTime())) errors.push('publishedAt invalid');
else if (pub.getTime() > Date.now()) errors.push('publishedAt in future');

// categories
if (!Array.isArray(item.categories) || item.categories.length === 0) {
  errors.push('no categories');
}

// author
if (!item.author?._ref && !item.author?._id) errors.push('author missing');

if (errors.length > 0) {
  // Branch to Error output
  return {
    json: { ...item.json, _validation_errors: errors }
  };
}

// Branch to Continue output
return { json: item.json };
```

> If your Function node only has one output, throw the errors instead:
> ```javascript
> if (errors.length > 0) throw new Error('Validation failed: ' + errors.join(', '));
> ```

---

## Optional but recommended: pre-publish duplicate check

Add a **Sanity HTTP Request** node **before** the create node that does a GROQ lookup:

```
*[_type == "post" && slug.current == $slug && !(_id in path("drafts.**"))][0]._id
```

with `$slug` = the slug from the input. If the response is non-empty, the post already exists — either skip the create (use `upsert` semantics in your create node) or branch to a "skip — already published" path. This prevents the same story being created twice when n8n retries after a transient error.

---

## Suggested Sanity node payload

When you call Sanity's `mutate` endpoint, build the document as:

```javascript
{
  _type: "post",
  title: item.title.trim(),
  slug: { _type: "slug", current: item.slug },
  body: item.body,                       // already a Portable Text array
  excerpt: item.excerpt || null,
  mainImage: item.mainImage,             // { _type: "image", asset: { _ref: ... } }
  publishedAt: item.publishedAt,
  author: { _type: "reference", _ref: item.author._ref },
  categories: item.categories.map(c => ({ _type: "reference", _ref: c._ref })),
  tags: (item.tags || []).map(t => ({ _type: "reference", _ref: t._ref })),
}
```

Use `mutate` with `createOrReplace: true` and `_id: \`post-${slug}\`` for idempotency.

---

## Health-check job (optional, recommended)

Set up a daily n8n **Schedule Trigger** workflow (or a Vercel Cron, or a Sanity webhook-driven check) that queries:

```
*[_type == "post" && !(_id in path("drafts.**")) && (length(title) < 10 || !defined(body) || !defined(mainImage))]{
  _id, title, "slug": slug.current, publishedAt
}
```

If the result is non-empty, send yourself an email or Slack message with the list. This catches the cases where n8n bypassed validation (e.g. after a manual override).
