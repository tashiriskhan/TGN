// Revalidate every 60 seconds for fresh content with caching
export const revalidate = 60;

import { client } from "@/sanity/lib/sanity"
import Link from "next/link"
import SmartImage from "@/app/components/SmartImage"
import { timeAgo } from "@/sanity/lib/timeAgo"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import RightSidebar from "@/app/components/RightSidebar"
import Breadcrumb from "@/app/components/Breadcrumb"
import Pagination from "@/app/components/Pagination"
import { getTagStories, getUnifiedSidebarData } from "@/app/lib/storyBridge"
import { siteConfig } from "@/config/site"

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const slug = p.slug

  let tag = null
  try {
    tag = await client.fetch(
      `*[_type == "tag" && slug.current == $slug][0]{ title }`,
      { slug }
    )
  } catch (err) {
    console.error("Failed to fetch tag metadata from Sanity:", err)
  }

  if (!tag) {
    const allTagStories = await getTagStories(slug)
    if (allTagStories.length === 0) {
      return {
        title: "Tag Not Found",
      }
    }
    const matchedTag = allTagStories[0]?.tags?.find((t: any) => t.slug === slug)
    const tagTitle = matchedTag?.title || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
    return {
      title: `Stories about #${tagTitle} | The Ground Narrative`,
      description: `Browse all stories, reports, and coverage tagged with #${tagTitle} on The Ground Narrative.`,
      alternates: {
        canonical: `${siteConfig.url}/tag/${slug}`,
      },
    }
  }

  return {
    title: `Stories about #${tag.title} | The Ground Narrative`,
    description: `Browse all stories, reports, and coverage tagged with #${tag.title} on The Ground Narrative.`,
    alternates: {
      canonical: `${siteConfig.url}/tag/${slug}`,
    },
  }
}

const PAGE_SIZE = 10

export default async function TagPage({ params, searchParams }: any) {
  const p = await params
  const s = await searchParams

  const slug = p.slug
  const page = Number(s.page) || 1

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  let tag = null
  try {
    tag = await client.fetch(
      `*[_type == "tag" && slug.current == $slug][0]{ title }`,
      { slug }
    )
  } catch (err) {
    console.error("Failed to fetch tag from Sanity:", err)
  }

  const allTagStories = await getTagStories(slug)
  const totalPosts = allTagStories.length
  const posts = allTagStories.slice(start, end)
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE)

  if (totalPosts === 0) {
    notFound()
  }

  const tagTitle = tag?.title || allTagStories[0]?.tags?.find((t: any) => t.slug === slug)?.title || (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '))

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
