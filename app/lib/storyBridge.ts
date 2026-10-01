import { cache } from 'react'
import { unstable_cache } from 'next/cache'
import { client as sanityClient } from '@/sanity/lib/client'
import Papa from 'papaparse'

const DEFAULT_CSV_URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vROKfW0By7Gatqo-jjUJ8oDaGO0VMnekoBb8nbZyGYgV7i9Skr0lxaXVSNbM5fHgB_-7ufyJnh_2V_p/pub?gid=0&single=true&output=csv'
const CSV_URL = process.env.SHEET_CSV_URL || DEFAULT_CSV_URL
const CSV_FETCH_TIMEOUT_MS = 5000

export interface UnifiedStory {
  title: string
  subtitle?: string
  excerpt?: string
  slug: string
  mainImage: any
  publishedAt: string
  isFeatured?: boolean
  isTrending?: boolean
  isBreaking?: boolean
  isOpinion?: boolean
  isInDepth?: boolean
  isSpecial?: boolean
  specialTag?: string
  categories?: Array<{ title: string; slug: string }>
  tags?: Array<{ title: string; slug: string }>
  author?: {
    name: string
    slug: string
    image?: any
    bio?: any
  }
  body?: any
}

// Fetch and parse the Google Sheet CSV.
// _fetchSheetStories is the raw worker. It is wrapped below in both
// unstable_cache (cross-request) and React cache() (per-request) so the CSV is
// downloaded and parsed at most once per revalidation window instead of once
// per getCombinedStories() call.
async function _fetchSheetStories(): Promise<UnifiedStory[]> {
  try {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), CSV_FETCH_TIMEOUT_MS)
    let csvText = ''
    try {
      const res = await fetch(CSV_URL, {
        next: { revalidate: 3600, tags: ['sheet'] },
        signal: controller.signal,
      })
      if (!res.ok) throw new Error(`CSV fetch status: ${res.status}`)
      csvText = await res.text()
    } finally {
      clearTimeout(timeout)
    }

    // A published-but-empty (or deleted) sheet returns 0 bytes — don't parse.
    if (!csvText.trim()) return []

    const parsed = Papa.parse(csvText, {
      header: true,
      skipEmptyLines: true
    })

    if (!parsed.data || !Array.isArray(parsed.data)) return []

    return parsed.data.map((row: any) => {
      // Create a normalized row with lowercase and trimmed keys
      const cleanRow: any = {}
      Object.keys(row).forEach(key => {
        cleanRow[key.trim().toLowerCase()] = row[key]
      })

      // Standardize booleans
      const getBool = (val: any) => typeof val === 'string' ? val.trim().toLowerCase() === 'true' : val === true

      // Clean author name mapping
      const authorName = cleanRow.author || 'The Ground Narrative'
      const authorSlug = authorName.toLowerCase().replace(/\s+/g, '-')

      // Date parsing check
      let dateIso = new Date().toISOString()
      if (cleanRow.publishedat) {
        const d = new Date(cleanRow.publishedat)
        if (!isNaN(d.getTime())) {
          dateIso = d.toISOString()
        }
      }

      // Categories parsing mapping
      const categorySlug = cleanRow.category ? cleanRow.category.trim().toLowerCase().replace(/\s+/g, '-') : 'world'
      const categoryTitle = cleanRow.category ? cleanRow.category.trim() : 'World'

      return {
        title: cleanRow.title || '',
        subtitle: cleanRow.subtitle || '',
        excerpt: cleanRow.excerpt || '',
        slug: cleanRow.slug || '',
        mainImage: cleanRow.imageurl || '', // Raw string URL
        publishedAt: dateIso,
        isFeatured: getBool(cleanRow.isfeatured),
        isTrending: getBool(cleanRow.istrending),
        isBreaking: getBool(cleanRow.isbreaking),
        isOpinion: getBool(cleanRow.isopinion),
        isInDepth: getBool(cleanRow.isindepth),
        isSpecial: getBool(cleanRow.isspecial),
        categories: [{ title: categoryTitle, slug: categorySlug }],
        tags: cleanRow.tags ? cleanRow.tags.split(',').map((t: string) => ({ title: t.trim(), slug: t.trim().toLowerCase().replace(/\s+/g, '-') })) : [],
        author: {
          name: authorName,
          slug: authorSlug
        },
        body: cleanRow.body || ''
      }
    })
  } catch (err) {
    console.error("Failed to load or parse Google Sheets CSV:", err)
    return []
  }
}

// Cross-request cache: downloaded and parsed once, shared by every caller until
// the next revalidation window. Tagged so a webhook can bust it on demand.
const getCachedSheetStories = unstable_cache(
  _fetchSheetStories,
  ['sheet-stories'],
  { revalidate: 3600, tags: ['sheet', 'posts'] }
)

// React cache() additionally dedupes within a single request.
export const fetchSheetStories = cache(getCachedSheetStories)

// Generic filter & fetch to combine Sanity and Sheets
export async function getCombinedStories(sanityQuery: string, sanityParams: any = {}): Promise<UnifiedStory[]> {
  const [sanityResults, sheetResults] = await Promise.all([
    sanityClient.fetch(sanityQuery, sanityParams)
      .then(res => Array.isArray(res) ? res : res ? [res] : [])
      .catch(err => {
        console.error("Sanity fetch failed in getCombinedStories, using empty array fallback:", err)
        return []
      }),
    fetchSheetStories()
  ])

  // Normalize Sanity items
  const normalizedSanity = sanityResults.map((story: any) => ({
    ...story,
    slug: story.slug?.current || story.slug || ''
  }))

  const finalSanity = normalizedSanity.filter((s: any) => s.slug && s.title)
  const finalSheet = sheetResults.filter((s: any) => s.slug && s.title)

  return {
    sanity: finalSanity,
    sheet: finalSheet
  } as any
}

// 1. Featured Stories
async function _getFeaturedStories(): Promise<UnifiedStory[]> {
  const query = `*[_type == "post" && isFeatured == true] | order(publishedAt desc)[0...5]{
    title,
    excerpt,
    mainImage,
    publishedAt,
    "slug": slug.current,
    author->{ name, "slug": slug.current, image },
    categories[]->{ title, "slug": slug.current }
  }`
  const data = await getCombinedStories(query) as any
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.isFeatured)
  ]
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const getFeaturedStories = unstable_cache(
  _getFeaturedStories,
  ['featured-stories'],
  { revalidate: 3600, tags: ['posts', 'featured'] }
)

// 2. Trending Stories
async function _getTrending(): Promise<UnifiedStory[]> {
  const query = `*[_type == "post" && isTrending == true] | order(publishedAt desc)[0...5]{
    title,
    excerpt,
    mainImage,
    publishedAt,
    "slug": slug.current,
    author->{ name, "slug": slug.current, image },
    categories[]->{ title, "slug": slug.current }
  }`
  const data = await getCombinedStories(query) as any
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.isTrending)
  ]
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 5)
}

export const getTrending = unstable_cache(
  _getTrending,
  ['trending-stories'],
  { revalidate: 3600, tags: ['posts', 'trending'] }
)

// 3. Breaking News
async function _getBreakingNews(): Promise<UnifiedStory[]> {
  const query = `*[_type == "post" && isBreaking == true && publishedAt >= now() - 30*60*60] | order(publishedAt desc)[0...5]{
    title,
    "slug": slug.current
  }`
  const data = await getCombinedStories(query) as any
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.isBreaking)
  ]
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

export const getBreakingNews = unstable_cache(
  _getBreakingNews,
  ['breaking-news'],
  { revalidate: 1800, tags: ['posts', 'breaking'] }
)

// 4. Opinion pieces
// Uses the isOpinion flag, but also falls back to posts filed under the
// "Opinion" category (sheet content often only sets the category, which
// left the homepage Opinion section empty).
async function _getOpinion(): Promise<UnifiedStory[]> {
  const query = `*[_type == "post" && (isOpinion == true || "opinion" in categories[]->slug.current)] | order(publishedAt desc)[0...8]{
    title,
    excerpt,
    mainImage,
    publishedAt,
    "slug": slug.current,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current }
  }`
  const data = await getCombinedStories(query) as any
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.isOpinion || (s.categories || []).some((c: { slug?: string }) => c.slug === 'opinion'))
  ]
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 8)
}

export const getOpinion = unstable_cache(
  _getOpinion,
  ['opinion-stories'],
  { revalidate: 3600, tags: ['posts', 'opinion'] }
)

// 5. In Depth
async function _getAllInDepth(): Promise<UnifiedStory[]> {
  const query = `*[_type == "post" && isInDepth == true] | order(publishedAt desc)[0...8]{
    title,
    excerpt,
    mainImage,
    publishedAt,
    "slug": slug.current,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current }
  }`
  const data = await getCombinedStories(query) as any
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.isInDepth)
  ]
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 8)
}

export const getAllInDepth = unstable_cache(
  _getAllInDepth,
  ['in-depth-stories'],
  { revalidate: 3600, tags: ['posts', 'in-depth'] }
)

// 6. Special
async function _getAllSpecial(): Promise<UnifiedStory[]> {
  const query = `*[_type == "post" && isSpecial == true] | order(publishedAt desc)[0...8]{
    title,
    excerpt,
    mainImage,
    publishedAt,
    "slug": slug.current,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current }
  }`
  const data = await getCombinedStories(query) as any
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.isSpecial)
  ]
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()).slice(0, 8)
}

export const getAllSpecial = unstable_cache(
  _getAllSpecial,
  ['special-reports'],
  { revalidate: 3600, tags: ['posts', 'special'] }
)

// 6b. Homepage: fetch every section in ONE Sanity round-trip, then merge the
// Sheet rows per section. Replaces six separate getCombinedStories() calls
// (six queries + six CSV lookups) with a single request.
export interface HomePageData {
  featuredStories: UnifiedStory[]
  trending: UnifiedStory[]
  breaking: UnifiedStory[]
  opinion: UnifiedStory[]
  inDepth: UnifiedStory[]
  special: UnifiedStory[]
}

const HOME_PAGE_QUERY = `{
  "featured": *[_type == "post" && isFeatured == true] | order(publishedAt desc)[0...5]{
    title, excerpt, mainImage, publishedAt, "slug": slug.current,
    author->{ name, "slug": slug.current, image },
    categories[]->{ title, "slug": slug.current }
  },
  "trending": *[_type == "post" && isTrending == true] | order(publishedAt desc)[0...5]{
    title, excerpt, mainImage, publishedAt, "slug": slug.current,
    author->{ name, "slug": slug.current, image },
    categories[]->{ title, "slug": slug.current }
  },
  "breaking": *[_type == "post" && isBreaking == true && publishedAt >= now() - 30*60*60] | order(publishedAt desc)[0...5]{
    title, "slug": slug.current
  },
  "opinion": *[_type == "post" && (isOpinion == true || "opinion" in categories[]->slug.current)] | order(publishedAt desc)[0...8]{
    title, excerpt, mainImage, publishedAt, "slug": slug.current,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current }
  },
  "inDepth": *[_type == "post" && isInDepth == true] | order(publishedAt desc)[0...8]{
    title, excerpt, mainImage, publishedAt, "slug": slug.current,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current }
  },
  "special": *[_type == "post" && isSpecial == true] | order(publishedAt desc)[0...8]{
    title, excerpt, mainImage, publishedAt, "slug": slug.current,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current }
  }
}`

// Sanity returns `slug` as `{ current }`, while Sheet rows use a plain string.
type RawSanityStory = Partial<Omit<UnifiedStory, 'slug'>> & {
  slug?: string | { current?: string }
}

// Normalize Sanity rows and append matching Sheet rows, newest first.
function mergeSection(
  sanityItems: RawSanityStory[] | undefined,
  sheetItems: UnifiedStory[],
  predicate: (story: UnifiedStory) => boolean,
  limit?: number
): UnifiedStory[] {
  const normalizedSanity = (sanityItems || []).map((story) => ({
    ...story,
    slug: typeof story.slug === 'string' ? story.slug : story.slug?.current || '',
  }))
  const finalSanity = normalizedSanity.filter((s) => s.slug && s.title)
  const finalSheet = sheetItems.filter((s) => s.slug && s.title && predicate(s))

  const merged = ([...finalSanity, ...finalSheet] as UnifiedStory[]).sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  )
  return limit ? merged.slice(0, limit) : merged
}

async function _getHomePageData(): Promise<HomePageData> {
  const [sanityData, sheetStories] = await Promise.all([
    sanityClient
      .fetch<Record<string, RawSanityStory[]>>(HOME_PAGE_QUERY)
      .catch((err) => {
        console.error("Sanity homepage query failed, using Sheet rows only:", err)
        return {} as Record<string, RawSanityStory[]>
      }),
    fetchSheetStories(),
  ])

  const section = (key: string): RawSanityStory[] =>
    Array.isArray(sanityData?.[key]) ? sanityData[key] : []

  return {
    featuredStories: mergeSection(section('featured'), sheetStories, (s) => !!s.isFeatured),
    trending: mergeSection(section('trending'), sheetStories, (s) => !!s.isTrending, 5),
    breaking: mergeSection(section('breaking'), sheetStories, (s) => !!s.isBreaking),
    opinion: mergeSection(
      section('opinion'),
      sheetStories,
      (s) => !!s.isOpinion || (s.categories || []).some((c) => c.slug === 'opinion'),
      8
    ),
    inDepth: mergeSection(section('inDepth'), sheetStories, (s) => !!s.isInDepth, 8),
    special: mergeSection(section('special'), sheetStories, (s) => !!s.isSpecial, 8),
  }
}

export const getHomePageData = unstable_cache(
  _getHomePageData,
  ['homepage-data'],
  { revalidate: 3600, tags: ['posts', 'homepage'] }
)

// 7. Get single story detail by slug (fallback matching)
export async function getStoryBySlug(slug: string): Promise<UnifiedStory | null> {
  const query = `*[_type == "post" && slug.current == $slug][0]{
    title,
    subtitle,
    excerpt,
    body,
    publishedAt,
    mainImage{
      ...,
      asset->{
        _id,
        metadata{
          lqip,
          dimensions
        }
      }
    },
    author->{
      name,
      bio,
      "slug": slug.current,
      image
    },
    categories[]->{ title, "slug": slug.current },
    tags[]->{ title, "slug": slug.current }
  }`
  
  let sanityStory = null
  try {
    sanityStory = await sanityClient.fetch(query, { slug })
  } catch (err) {
    console.error(`Sanity fetch failed for slug ${slug}, checking Sheet fallback:`, err)
  }
  if (sanityStory) {
    return {
      ...sanityStory,
      slug: sanityStory.slug?.current || sanityStory.slug || ''
    }
  }

  // Fallback check in Google Sheet
  const sheetStories = await fetchSheetStories()
  const matched = sheetStories.find(s => s.slug === slug)
  return matched || null
}

// 8. Get Category Stories
export async function getCategoryStories(categorySlug: string): Promise<{ stories: UnifiedStory[]; total: number }> {
  const query = `*[_type == "post" && $categorySlug in categories[]->slug.current] | order(publishedAt desc) {
    title,
    subtitle,
    mainImage,
    publishedAt,
    "slug": slug.current,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current }
  }`

  const data = await getCombinedStories(query, { categorySlug }) as any
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.categories?.some((c: any) => c.slug === categorySlug))
  ]
  const sorted = merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return {
    stories: sorted,
    total: sorted.length
  }
}

// 9. Get Tag Stories
export async function getTagStories(tagSlug: string): Promise<UnifiedStory[]> {
  const query = `*[_type == "post" && $tagSlug in tags[]->slug.current] | order(publishedAt desc) {
    title,
    subtitle,
    mainImage,
    publishedAt,
    "slug": slug.current,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current }
  }`

  const data = await getCombinedStories(query, { tagSlug }) as any
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.tags?.some((t: any) => t.slug === tagSlug))
  ]
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

// 10. Search Stories
export async function searchStories(searchQuery: string): Promise<UnifiedStory[]> {
  const query = `*[_type == "post" && (title match $searchQuery || excerpt match $searchQuery)] | order(publishedAt desc)[0...50] {
    title,
    subtitle,
    mainImage,
    publishedAt,
    "slug": slug.current,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current }
  }`

  const data = await getCombinedStories(query, { searchQuery: `*${searchQuery}*` }) as any
  const lowerSearch = searchQuery.toLowerCase()
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => 
      s.title.toLowerCase().includes(lowerSearch) || 
      s.excerpt.toLowerCase().includes(lowerSearch) ||
      s.body.toLowerCase().includes(lowerSearch)
    )
  ]
  return merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
}

// 11. Get Related Stories
export async function getRelatedStories(currentSlug: string, categorySlug?: string, tagSlugs: string[] = []): Promise<UnifiedStory[]> {
  const query = `*[_type == "post" && slug.current != $currentSlug] | order(publishedAt desc)[0...10] {
    title,
    "slug": slug.current,
    mainImage,
    publishedAt,
    subtitle,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current },
    tags[]->{ title, "slug": slug.current }
  }`

  const data = await getCombinedStories(query, { currentSlug }) as any
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.slug !== currentSlug)
  ].filter((s: any) => s.slug && s.title)

  // Filter by matching category or tags to simulate relevance
  const filtered = merged.filter((s: any) => {
    const matchesCategory = categorySlug && s.categories?.some((c: any) => c.slug === categorySlug)
    const matchesTags = tagSlugs.length > 0 && s.tags?.some((t: any) => tagSlugs.includes(t.slug))
    return matchesCategory || matchesTags
  })

  // Fallback to latest stories if not enough matches
  const pool = filtered.length >= 4 ? filtered : merged
  return pool
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 4)
}

// 12. Combined Sidebar Stories
async function buildUnifiedSidebarData(excludeSlug?: string): Promise<{ trending: UnifiedStory[]; recentStories: UnifiedStory[] }> {
  const trending = await getTrending()
  
  const allSanityQuery = `*[_type == "post" ${excludeSlug ? '&& slug.current != $excludeSlug' : ''}] | order(publishedAt desc)[0...10] {
    title,
    "slug": slug.current,
    mainImage,
    publishedAt
  }`
  
  const data = await getCombinedStories(allSanityQuery, excludeSlug ? { excludeSlug } : {}) as any
  const mergedRecent = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.slug !== excludeSlug)
  ]

  const sortedRecent = mergedRecent
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5)

  return {
    trending,
    recentStories: sortedRecent
  }
}

// Cache per excludeSlug: tag/author/search share one entry, while each story
// gets its own so it can exclude itself from the "recent stories" list.
export function getUnifiedSidebarData(excludeSlug?: string): Promise<{ trending: UnifiedStory[]; recentStories: UnifiedStory[] }> {
  const tags = ['posts', 'sidebar']
  if (excludeSlug) tags.push(`story-${excludeSlug}`)

  return unstable_cache(
    () => buildUnifiedSidebarData(excludeSlug),
    [`unified-sidebar-${excludeSlug ?? 'all'}`],
    { revalidate: 3600, tags }
  )()
}

// 13. Get Author Stories
export async function getAuthorStories(authorSlug: string): Promise<{ stories: UnifiedStory[]; total: number }> {
  const query = `*[_type == "post" && author->slug.current == $authorSlug] | order(publishedAt desc) {
    title,
    subtitle,
    mainImage,
    publishedAt,
    "slug": slug.current,
    author->{ name, "slug": slug.current },
    categories[]->{ title, "slug": slug.current }
  }`

  const data = await getCombinedStories(query, { authorSlug }) as any
  const merged = [
    ...data.sanity,
    ...data.sheet.filter((s: any) => s.author?.slug === authorSlug)
  ]
  const sorted = merged.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
  return {
    stories: sorted,
    total: sorted.length
  }
}

