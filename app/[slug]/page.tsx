// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import RightSidebar from "@/app/components/RightSidebar"

const PAGE_SIZE = 10

// Reserved route names that should not be treated as categories
const RESERVED_ROUTES = [
  'story',
  'tag',
  'author',
  'search',
  'about',
  'contact',
  'privacy',
  'terms',
  'sanity',
  'photos',
  'videos',
  'podcasts'
]

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

  // Get category title
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{ title }`,
    { slug }
  )

  // If no category found, return 404
  if (!category) {
    notFound()
  }

  // Fetch posts inside this category
  const posts = await client.fetch(
    `*[_type == "post" && category->slug.current == $slug]
      | order(publishedAt desc)[$start...$end] {
        title,
        subtitle,
        mainImage,
        publishedAt,
        "slug": slug.current
      }`,
    { slug, start, end }
  )

  const totalPosts = await client.fetch(
    `count(*[_type == "post" && category->slug.current == $slug])`,
    { slug }
  )

  const totalPages = Math.ceil(totalPosts / PAGE_SIZE)

  return (
    <main className="main-content-with-sidebar">
      <div className="container">
        {/* LEFT: MAIN CONTENT */}
        <div className="main-content">
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
              {posts.map((post: any) => (
                <article key={post.slug} className="category-card">
                  <Link href={`/story/${post.slug}`} className="cat-link">

                    <div className="category-image-wrapper">
                      {post.mainImage && (
                        <Image
                          src={urlFor(post.mainImage).width(600).height(400).url()}
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

        {/* RIGHT: UNIFIED SIDEBAR */}
        <RightSidebar />
      </div>
    </main>
  )
}
