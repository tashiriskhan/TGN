import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/sanity'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  // Fetch all posts from Sanity
  const posts = await client.fetch(`
    *[_type == "post" && defined(slug.current)] {
      "slug": slug.current,
      publishedAt
    }
    | order(publishedAt desc)
  `)

  // Fetch all authors
  const authors = await client.fetch(`
    *[_type == "author" && defined(slug.current)] {
      "slug": slug.current
    }
  `)

  // Fetch all categories
  const categories = await client.fetch(`
    *[_type == "category" && defined(slug.current)] {
      "slug": slug.current
    }
  `)

  // Fetch all tags
  const tags = await client.fetch(`
    *[_type == "tag" && defined(slug.current)] {
      "slug": slug.current
    }
  `)

  // Fetch all photo stories
  const photoStories = await client.fetch(`
    *[_type == "photoStory" && defined(slug.current)] {
      "slug": slug.current,
      publishedAt
    }
    | order(publishedAt desc)
  `)

  // Fetch all video stories
  const videoStories = await client.fetch(`
    *[_type == "videoStory" && defined(slug.current)] {
      "slug": slug.current,
      publishedAt
    }
    | order(publishedAt desc)
  `)

  // Fetch all podcasts
  const podcasts = await client.fetch(`
    *[_type == "podcast" && defined(slug.current)] {
      "slug": slug.current,
      publishedAt
    }
    | order(publishedAt desc)
  `)

  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/search`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/photos`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/videos`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/podcasts`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.3,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly' as const,
      priority: 0.2,
    },
  ]

  const postEntries = posts.map((post: any) => ({
    url: `${baseUrl}/story/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const authorEntries = authors.map((author: any) => ({
    url: `${baseUrl}/author/${author.slug}`,
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
    lastModified: new Date(story.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const videoEntries = videoStories.map((story: any) => ({
    url: `${baseUrl}/videos/${story.slug}`,
    lastModified: new Date(story.publishedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  const podcastEntries = podcasts.map((podcast: any) => ({
    url: `${baseUrl}/podcasts/${podcast.slug}`,
    lastModified: new Date(podcast.publishedAt),
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
