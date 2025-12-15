// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import { client } from "@/sanity/lib/sanity"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import RightSidebar from "@/app/components/RightSidebar"
import Breadcrumb from "@/app/components/Breadcrumb"
import Pagination from "@/app/components/Pagination"

const PAGE_SIZE = 10

export default async function TagPage({ params, searchParams }: any) {
  const p = await params
  const s = await searchParams

  const slug = p.slug
  const page = Number(s.page) || 1

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const tag = await client.fetch(
    `*[_type == "tag" && slug.current == $slug][0]{ title }`,
    { slug }
  )

  const posts = await client.fetch(
    `*[_type == "post" && $slug in tags[]->slug.current]
      | order(publishedAt desc)[$start...$end]{
        title,
        subtitle,
        mainImage,
        publishedAt,
        "slug": slug.current
      }`,
    { slug, start, end }
  )

  const totalPosts = await client.fetch(
    `count(*[_type == "post" && $slug in tags[]->slug.current])`,
    { slug }
  )

  const totalPages = Math.ceil(totalPosts / PAGE_SIZE)

  return (
    <main className="main-content-with-sidebar">
      <div className="container">
        {/* LEFT: MAIN CONTENT */}
        <div className="main-content">
          {/* BREADCRUMB */}
          <Breadcrumb
            items={[
              { label: 'Home', href: '/' },
              { label: `#${tag?.title || slug}` }
            ]}
          />

          <header className="category-header">
            <h1 className="category-title">#{tag?.title || slug}</h1>
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
          {totalPosts > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath={`tag/${slug}`}
            />
          )}
        </div>

        {/* RIGHT: UNIFIED SIDEBAR */}
        <RightSidebar />
      </div>
    </main>
  )
}
