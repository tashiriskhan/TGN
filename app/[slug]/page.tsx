// Revalidate every 60 seconds for fresh content with caching
export const revalidate = 60;

import { client } from "@/sanity/lib/sanity"
import Link from "next/link"
import SmartImage from "@/app/components/SmartImage"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Breadcrumb from "@/app/components/Breadcrumb"
import { siteConfig } from "@/config/site"
import { getCategoryStories } from "@/app/lib/storyBridge"

const PAGE_SIZE = 9

// Reserved route names that should not be treated as categories
const RESERVED_ROUTES = [
  'story',
  'tag',
  'author',
  'authors',
  'search',
  'about',
  'contact',
  'privacy',
  'terms',
  'sanity',
  'photos',
  'videos',
  'podcasts',
  'editorial-policy',
  'corrections-policy',
  'ethics-statement'
]

export async function generateMetadata({ params, searchParams }: any): Promise<Metadata> {
  const p = await params
  const s = await searchParams
  const slug = p.slug
  const page = Number(s.page) || 1

  if (RESERVED_ROUTES.includes(slug)) {
    return {}
  }

  let category = null
  try {
    category = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]{
        title,
        description
      }`,
      { slug }
    )
  } catch (err) {
    console.error("Failed to fetch category metadata from Sanity:", err)
  }

  if (!category) {
    const { total } = await getCategoryStories(slug)
    if (total === 0) {
      return {
        title: "Category Not Found",
      }
    }
    const derivedTitle = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
    return {
      title: `${derivedTitle} | The Ground Narrative`,
      description: `Read in-depth reporting and stories on ${derivedTitle} from The Ground Narrative.`,
      alternates: {
        canonical: `${siteConfig.url}/${slug}`,
      },
      ...(page > 1 && {
        robots: { index: false, follow: true },
      }),
    }
  }

  return {
    title: `${category.title} | The Ground Narrative`,
    description: category.description || `Read in-depth reporting and stories on ${category.title} from The Ground Narrative.`,
    alternates: {
      canonical: `${siteConfig.url}/${slug}`,
    },
    // Paginated views compete with the first page; tell Google to ignore them.
    ...(page > 1 && {
      robots: { index: false, follow: true },
    }),
  }
}

export default async function CategoryPage({ params, searchParams }: any) {
  // FIX: unwrap async params
  const p = await params
  const s = await searchParams

  const slug = p.slug

  // Prevent conflicts with reserved routes
  if (RESERVED_ROUTES.includes(slug)) {
    notFound()
  }

  const page = Number(s.page) || 1

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  // Fetch combined posts inside this category (Sanity + Google Sheets)
  const { stories: allCategoryStories, total: totalPosts } = await getCategoryStories(slug)

  // Empty category = soft 404. Return a real 404 so Google doesn't index an empty page.
  if (totalPosts === 0) {
    notFound()
  }

  // Get category title with description
  let category = null
  try {
    category = await client.fetch(
      `*[_type == "category" && slug.current == $slug][0]{
        title,
        description
      }`,
      { slug }
    )
  } catch (err) {
    console.error("Failed to fetch category from Sanity:", err)
  }

  // Fallback if not found in Sanity
  if (!category) {
    const matchedCat = allCategoryStories[0]?.categories?.find((c: any) => c.slug === slug)
    category = {
      title: matchedCat?.title || (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')),
      description: `Read in-depth reporting and stories on ${slug} from The Ground Narrative.`
    }
  }

  // Implement slice for pagination
  const posts = allCategoryStories.slice(start, end)
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE)

  return (
    <main className="main-content-full">
      <div className="container">
        <div className="main-content">
          {/* BREADCRUMB */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: category?.title || slug, href: `/${slug}` }
            ]}
          />

          <header className="category-header">
            <h1 className="category-title">{category?.title || slug}</h1>
            {category?.description && (
              <p className="category-description">{category.description}</p>
            )}
            <p className="category-count">
              {totalPosts} {totalPosts === 1 ? 'article' : 'articles'}
            </p>
          </header>

          {/* FILTERS/SORT TOOLBAR (Structure for future use) */}
          <div className="category-toolbar">
            <div className="toolbar-left">
              <span className="toolbar-label">Sort by:</span>
              <select className="toolbar-select" defaultValue="latest">
                <option value="latest">Latest</option>
                <option value="oldest">Oldest</option>
                <option value="popular">Most Popular</option>
              </select>
            </div>
            <div className="toolbar-right">
              <span className="toolbar-page-info">
                Page {page} of {totalPages}
              </span>
            </div>
          </div>

          {/* POSTS GRID */}
          <section className="category-grid">
            {posts?.length === 0 && (
              <p className="no-stories">No stories found in this category.</p>
            )}

            <div className="category-grid-container">
              {posts.map((post: any, index: number) => (
                <article key={`${post.slug}-${index}`} className="category-card">
                  <Link href={`/story/${post.slug}`} className="cat-link">

                    <div className="category-image-wrapper">
                      {post.mainImage && (
                        <SmartImage
                          image={post.mainImage}
                          alt={post.title}
                          fill
                          className="cat-img"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      )}
                    </div>

                    <div className="category-card-content">
                      <h3 className="category-card-title">{post.title}</h3>

                      {post.subtitle && (
                        <p className="category-card-summary">{post.subtitle}</p>
                      )}

                      <span className="category-card-date">
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </span>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          </section>

          {/* PAGINATION */}
          <div className="pagination-box">
            {page > 1 && (
              <Link href={`/${slug}?page=${page - 1}`} className="pagination-btn">
                ← Previous
              </Link>
            )}

            <span className="pagination-info">
              Showing {start + 1}-{Math.min(end, totalPosts)} of {totalPosts}
            </span>

            {page < totalPages && (
              <Link href={`/${slug}?page=${page + 1}`} className="pagination-btn">
                Next →
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
