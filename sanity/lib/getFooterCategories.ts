import { client } from "./sanity"
import { FOOTER_CATEGORIES_QUERY } from "./queries"

// Static fallback — mirrors the real categories in Sanity Studio.
// Update this list if you add/remove categories in Sanity.
export const STATIC_NAV_CATEGORIES = [
  { title: "World", slug: "world" },
  { title: "Politics", slug: "politics" },
  { title: "Opinion", slug: "opinion" },
  { title: "Health", slug: "health" },
  { title: "Technology", slug: "technology" },
  { title: "Culture", slug: "culture" },
  { title: "Business", slug: "business" },
  { title: "Science", slug: "science" },
  { title: "Sports", slug: "sports" },
]

export async function getFooterCategories() {
  try {
    const categories = await client.fetch(FOOTER_CATEGORIES_QUERY)
    // If Sanity returns a non-empty array, use it; otherwise fall back to static list
    if (Array.isArray(categories) && categories.length > 0) {
      return categories
    }
    return STATIC_NAV_CATEGORIES
  } catch (err) {
    console.error("Failed to fetch footer categories from Sanity, using fallbacks:", err)
    return STATIC_NAV_CATEGORIES
  }
}
