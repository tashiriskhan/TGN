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
      url: `${baseUrl}/opinion`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/features`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/breaking`,
      lastModified: new Date(),
      changeFrequency: 'hourly' as const,
      priority: 0.9,
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
    url: `${baseUrl}/category/${category.slug}`,
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

  return [
    ...staticPages,
    ...postEntries,
    ...authorEntries,
    ...categoryEntries,
    ...tagEntries,
  ]
}
