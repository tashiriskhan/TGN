import { cache } from 'react'
import { unstable_cache } from 'next/cache'
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

// Cross-request cache: nav categories are identical for every visitor on every
// page. React cache() only dedupes within a single request, so we also wrap the
// query in unstable_cache with a long TTL and a tag the Sanity webhook can bust.
const getCachedFooterCategories = unstable_cache(
  async () => {
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
  },
  ['footer-categories'],
  { revalidate: 86400, tags: ['categories'] }
)

// Header and Footer share a single cached query per request via React cache().
export const getFooterCategories = cache(getCachedFooterCategories)
