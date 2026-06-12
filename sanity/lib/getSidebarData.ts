/**
 * Shared sidebar data with request-level caching.
 *
 * The right sidebar (trending posts + recent stories) is the same on every
 * page that shows it (story, tag, author, search). Without caching, each
 * page regeneration re-fetches the same data from Sanity.
 *
 * Using unstable_cache with a 60-second revalidation window means:
 * - First page request: fetches from Sanity, caches the result
 * - Subsequent page requests within 60s: returns the cached result
 * - After 60s: next request fetches fresh data, caches it
 *
 * This cuts Sanity queries by ~75% for sidebar data.
 *
 * Story pages can pass `excludeSlug` to keep the current story out of the
 * "recent stories" list. When excludeSlug is provided, we use a different
 * cache key so story pages and non-story pages don't share stale data.
 */

import { unstable_cache } from 'next/cache'
import { client } from './sanity'

interface SidebarData {
  trending: any[]
  recentStories: any[]
}

async function fetchSidebarData(excludeSlug?: string): Promise<SidebarData> {
  const recentStoriesQuery = excludeSlug
    ? `*[_type == "post" && slug.current != $excludeSlug] | order(publishedAt desc)[0...5]{
        title,
        "slug": slug.current,
        mainImage,
        publishedAt
      }`
    : `*[_type == "post"] | order(publishedAt desc)[0...5]{
        title,
        "slug": slug.current,
        mainImage,
        publishedAt
      }`

  const [trending, recentStories] = await Promise.all([
    client.fetch(`*[_type == "post" && isTrending == true] | order(publishedAt desc)[0...5]{
      title,
      "slug": slug.current,
      mainImage,
      publishedAt
    }`),
    client.fetch(recentStoriesQuery, excludeSlug ? { excludeSlug } : {})
  ])

  return { trending, recentStories }
}

// Non-story pages: trending + all recent stories. Shared cache.
const fetchStandardSidebar = unstable_cache(
  () => fetchSidebarData(),
  ['sidebar-data-standard'],
  { revalidate: 60, tags: ['sidebar'] }
)

// Story pages: trending + recent stories excluding the current one.
// Keyed on slug so each story gets its own cache entry.
function fetchStorySidebar(slug: string) {
  return unstable_cache(
    () => fetchSidebarData(slug),
    [`sidebar-data-story-${slug}`],
    { revalidate: 60, tags: ['sidebar', `story-${slug}`] }
  )()
}

/**
 * Get sidebar data for non-story pages (tag, author, search, etc.)
 */
export async function getSidebarData(): Promise<SidebarData> {
  return fetchStandardSidebar()
}

/**
 * Get sidebar data for story pages, excluding the current story from recent.
 */
export async function getStorySidebarData(slug: string): Promise<SidebarData> {
  return fetchStorySidebar(slug)
}
