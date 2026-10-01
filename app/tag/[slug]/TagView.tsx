import Link from "next/link"
import { notFound } from "next/navigation"
import SmartImage from "@/app/components/SmartImage"
import RightSidebar from "@/app/components/RightSidebar"
import Breadcrumb from "@/app/components/Breadcrumb"
import Pagination from "@/app/components/Pagination"
import { client } from "@/sanity/lib/sanity"
import { getTagStories, getUnifiedSidebarData } from "@/app/lib/storyBridge"

export const PAGE_SIZE = 10

/**
 * Resolve a tag's display title, falling back to the first matching story's
 * embedded tag. Returns null when the tag has no content.
 */
export async function getTagTitle(slug: string): Promise<string | null> {
  let tag = null
  try {
    tag = await client.fetch(
      `*[_type == "tag" && slug.current == $slug][0]{ title }`,
      { slug }
    )
  } catch (err) {
    console.error("Failed to fetch tag from Sanity:", err)
  }

  if (tag?.title) return tag.title

  const allTagStories = await getTagStories(slug)
  if (allTagStories.length === 0) return null
  return (
    allTagStories[0]?.tags?.find((t: any) => t.slug === slug)?.title ||
    (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '))
  )
}

export default async function TagView({ slug, page }: { slug: string; page: number }) {
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const allTagStories = await getTagStories(slug)
  const totalPosts = allTagStories.length

  if (totalPosts === 0) {
    notFound()
  }

  const posts = allTagStories.slice(start, end)
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE)
  const tagTitle = (await getTagTitle(slug)) || slug

  // Fetch sidebar data merged from Sanity + Google Sheets
  const { trending, recentStories } = await getUnifiedSidebarData()

  return (
    <main className="main-content-with-sidebar">
      <div className="container">
        {/* LEFT: MAIN CONTENT */}
        <div className="main-content">
          {/* BREADCRUMB */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: `#${tagTitle}`, href: `/tag/${slug}` }
            ]}
          />

          <header className="category-header">
            <h1 className="category-title">#{tagTitle}</h1>
            <p className="category-count">
              {totalPosts} {totalPosts === 1 ? 'article' : 'articles'}
            </p>
          </header>

          {/* POSTS GRID */}
          <section className="category-grid">
            {posts?.length === 0 && (
              <p className="no-stories">No stories found with this tag.</p>
            )}

            <div className="category-grid-container">
              {posts.map((post: any) => (
                <article key={post.slug} className="category-card">
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
          {totalPosts > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={`tag/${slug}`}
            />
          )}
        </div>

        {/* RIGHT: UNIFIED SIDEBAR */}
        <RightSidebar trending={trending} recentStories={recentStories} />
      </div>
    </main>
  )
}
