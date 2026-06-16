import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/sanity'
import { siteConfig } from '@/config/site'
import { fetchSheetStories } from '@/app/lib/storyBridge'

export const revalidate = 3600

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url

  // 1. Fetch from Sanity with try-catch
  let posts: any[] = []
  try {
    posts = await client.fetch(`
      *[_type == "post" && defined(slug.current) && !(_id in path("drafts.**")) && length(title) > 10 && defined(body)] {
        "slug": slug.current,
        publishedAt
      }
      | order(publishedAt desc)
    `)
  } catch (err) {
    console.error("Sitemap: Failed to fetch posts from Sanity:", err)
  }

  let authors: any[] = []
  try {
    authors = await client.fetch(`
      *[_type == "author" && defined(slug.current) && count(*[_type == "post" && references(^._id)]) > 0] {
        "slug": slug.current
      }
    `)
  } catch (err) {
    console.error("Sitemap: Failed to fetch authors from Sanity:", err)
  }

  let categories: any[] = []
  try {
    categories = await client.fetch(`
      *[_type == "category" && defined(slug.current) && count(*[_type == "post" && references(^._id)]) > 0] {
        "slug": slug.current
      }
    `)
  } catch (err) {
    console.error("Sitemap: Failed to fetch categories from Sanity:", err)
  }

  let tags: any[] = []
  try {
    tags = await client.fetch(`
      *[_type == "tag" && defined(slug.current) && count(*[_type == "post" && references(^._id)]) > 0] {
        "slug": slug.current
      }
    `)
  } catch (err) {
    console.error("Sitemap: Failed to fetch tags from Sanity:", err)
  }

  let photoStories: any[] = []
  try {
    photoStories = await client.fetch(`
      *[_type == "photoStory" && defined(slug.current) && !(_id in path("drafts.**")) && length(title) > 5] {
        "slug": slug.current,
        publishedAt
      }
      | order(publishedAt desc)
    `)
  } catch (err) {
    console.error("Sitemap: Failed to fetch photo stories from Sanity:", err)
  }

  let videoStories: any[] = []
  try {
    videoStories = await client.fetch(`
      *[_type == "videoStory" && defined(slug.current) && !(_id in path("drafts.**")) && length(title) > 5] {
        "slug": slug.current,
        publishedAt
      }
      | order(publishedAt desc)
    `)
  } catch (err) {
    console.error("Sitemap: Failed to fetch video stories from Sanity:", err)
  }

  let podcasts: any[] = []
  try {
    podcasts = await client.fetch(`
      *[_type == "podcast" && defined(slug.current) && !(_id in path("drafts.**")) && length(title) > 5] {
        "slug": slug.current,
        publishedAt
      }
      | order(publishedAt desc)
    `)
  } catch (err) {
    console.error("Sitemap: Failed to fetch podcasts from Sanity:", err)
  }

  // 2. Fetch from Google Sheets
  let sheetStories: any[] = []
  try {
    sheetStories = await fetchSheetStories()
  } catch (err) {
    console.error("Sitemap: Failed to fetch Google Sheet stories:", err)
  }

  // 3. Create sets to track existing slugs so we don't duplicate
  const postSlugs = new Set(posts.map(p => p.slug))
  const authorSlugs = new Set(authors.map(a => a.slug))
  const categorySlugs = new Set(categories.map(c => c.slug))
  const tagSlugs = new Set(tags.map(t => t.slug))

  // 4. Merge sheet data
  sheetStories.forEach(story => {
    if (story.slug && !postSlugs.has(story.slug)) {
      posts.push({
        slug: story.slug,
        publishedAt: story.publishedAt
      })
      postSlugs.add(story.slug)
    }

    if (story.author?.slug && !authorSlugs.has(story.author.slug)) {
      authors.push({ slug: story.author.slug })
      authorSlugs.add(story.author.slug)
    }

    if (story.categories) {
      story.categories.forEach((cat: any) => {
        if (cat.slug && !categorySlugs.has(cat.slug)) {
          categories.push({ slug: cat.slug })
          categorySlugs.add(cat.slug)
        }
      })
    }

    if (story.tags) {
      story.tags.forEach((tag: any) => {
        if (tag.slug && !tagSlugs.has(tag.slug)) {
          tags.push({ slug: tag.slug })
          tagSlugs.add(tag.slug)
        }
      })
    }
  })

  // 5. Build entries
  const staticPages = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 1 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly' as const, priority: 0.5 },
    { url: `${baseUrl}/photos`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/videos`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/podcasts`, lastModified: new Date(), changeFrequency: 'daily' as const, priority: 0.8 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/contact`, lastModified: new Date(), changeFrequency: 'monthly' as const, priority: 0.3 },
    { url: `${baseUrl}/privacy`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
    { url: `${baseUrl}/terms`, lastModified: new Date(), changeFrequency: 'yearly' as const, priority: 0.2 },
  ]

  const postEntries = posts.map((post: any) => ({
    url: `${baseUrl}/story/${post.slug}`,
    lastModified: post.publishedAt ? new Date(post.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const authorEntries = authors.map((author: any) => ({
    url: `${baseUrl}/authors/${author.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  const categoryEntries = categories.map((category: any) => ({
    url: `${baseUrl}/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }))

  const tagEntries = tags.map((tag: any) => ({
    url: `${baseUrl}/tag/${tag.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }))

  const photoEntries = photoStories.map((story: any) => ({
    url: `${baseUrl}/photos/${story.slug}`,
    lastModified: story.publishedAt ? new Date(story.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const videoEntries = videoStories.map((story: any) => ({
    url: `${baseUrl}/videos/${story.slug}`,
    lastModified: story.publishedAt ? new Date(story.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const podcastEntries = podcasts.map((podcast: any) => ({
    url: `${baseUrl}/podcasts/${podcast.slug}`,
    lastModified: podcast.publishedAt ? new Date(podcast.publishedAt) : new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    ...staticPages,
    ...postEntries,
    ...authorEntries,
    ...categoryEntries,
    ...tagEntries,
    ...photoEntries,
    ...videoEntries,
    ...podcastEntries,
  ]
}
