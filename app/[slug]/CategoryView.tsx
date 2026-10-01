import Link from "next/link"
import { notFound } from "next/navigation"
import SmartImage from "@/app/components/SmartImage"
import Breadcrumb from "@/app/components/Breadcrumb"
import { client } from "@/sanity/lib/sanity"
import { getCategoryStories } from "@/app/lib/storyBridge"

export const PAGE_SIZE = 9

// Reserved route names that should not be treated as categories
export const RESERVED_ROUTES = [
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

export interface CategoryMeta {
  title: string
  description?: string
}

/**
 * Fetch a category's title/description. Returns null when the slug is a
 * reserved route or has no content.
 */
export async function getCategoryMeta(slug: string): Promise<CategoryMeta | null> {
  if (RESERVED_ROUTES.includes(slug)) return null

  let category: CategoryMeta | null = null
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

  if (!category) {
    const { stories, total } = await getCategoryStories(slug)
    if (total === 0) return null
    const matchedCat = stories[0]?.categories?.find((c: any) => c.slug === slug)
    return {
      title: matchedCat?.title || (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')),
      description: `Read in-depth reporting and stories on ${slug} from The Ground Narrative.`
    }
  }

  return category
}

export default async function CategoryView({ slug, page }: { slug: string; page: number }) {
  if (RESERVED_ROUTES.includes(slug)) {
    notFound()
  }

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  // Fetch combined posts inside this category (Sanity + Google Sheets)
  const { stories: allCategoryStories, total: totalPosts } = await getCategoryStories(slug)

  // Empty category = soft 404. Return a real 404 so Google doesn't index an empty page.
  if (totalPosts === 0) {
    notFound()
  }

  const category = await getCategoryMeta(slug)

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
              <Link href={`/${slug}/page/${page - 1}`} className="pagination-btn">
                ← Previous
              </Link>
            )}

            <span className="pagination-info">
              Showing {start + 1}-{Math.min(end, totalPosts)} of {totalPosts}
            </span>

            {page < totalPages && (
              <Link href={`/${slug}/page/${page + 1}`} className="pagination-btn">
                Next →
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  )
}
