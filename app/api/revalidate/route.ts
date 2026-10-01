import { NextRequest, NextResponse } from 'next/server'
import { revalidateTag } from 'next/cache'

/**
 * Sanity webhook -> on-demand revalidation.
 *
 * Setup:
 *  1. Set SANITY_REVALIDATE_SECRET in the environment (locally + Cloudflare).
 *  2. In Sanity Manage -> API -> Webhooks, add a webhook pointing at
 *     https://<your-domain>/api/revalidate?secret=<SANITY_REVALIDATE_SECRET>
 *     with the "Create/Update/Delete" triggers you care about.
 *
 * The payload's `_type` decides which cache tags get busted. Every content
 * query caches under the `posts` tag by default, so a post publish refreshes
 * all story lists even if the type mapping is incomplete.
 */

// Maps a Sanity document type to the cache tags used by unstable_cache/fetch.
const TYPE_TAGS: Record<string, string[]> = {
  post: ['posts', 'trending', 'featured', 'breaking', 'opinion', 'in-depth', 'special', 'sidebar'],
  category: ['categories', 'posts'],
  author: ['posts'],
  tag: ['posts'],
  photoStory: ['posts'],
  videoStory: ['posts'],
  podcast: ['posts'],
  siteSettings: ['categories'],
}

function getSecret(req: NextRequest) {
  return (
    req.nextUrl.searchParams.get('secret') ||
    req.headers.get('x-webhook-secret') ||
    ''
  )
}

function collectTags(body: any): string[] {
  const tags = new Set<string>(['posts'])
  const type = body?._type
  if (type && TYPE_TAGS[type]) {
    TYPE_TAGS[type].forEach((t) => tags.add(t))
  }
  const slug = body?.slug?.current || body?.slug
  if (slug && typeof slug === 'string') {
    tags.add(`story-${slug}`)
  }
  return [...tags]
}

export async function POST(req: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET
  if (!expected) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not configured' }, { status: 500 })
  }
  if (getSecret(req) !== expected) {
    return NextResponse.json({ message: 'invalid secret' }, { status: 401 })
  }

  let body: any = {}
  try {
    body = await req.json()
  } catch {
    body = {}
  }

  const tags = collectTags(body)
  tags.forEach((tag) => revalidateTag(tag, 'max'))

  return NextResponse.json({ revalidated: true, tags })
}

// Allow a simple manual trigger: GET /api/revalidate?secret=...&tag=posts
export async function GET(req: NextRequest) {
  const expected = process.env.SANITY_REVALIDATE_SECRET
  if (!expected) {
    return NextResponse.json({ message: 'SANITY_REVALIDATE_SECRET is not configured' }, { status: 500 })
  }
  if (getSecret(req) !== expected) {
    return NextResponse.json({ message: 'invalid secret' }, { status: 401 })
  }

  const tag = req.nextUrl.searchParams.get('tag') || 'posts'
  revalidateTag(tag, 'max')
  return NextResponse.json({ revalidated: true, tags: [tag] })
}
