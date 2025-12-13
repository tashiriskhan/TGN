// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import { client } from "@/sanity/lib/sanity"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import RightSidebar from "@/app/components/RightSidebar"

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
          <h1 className="tag-title">#{tag?.title || slug}</h1>

          {/* BBC-STYLE GRID */}
          <div className="category-grid">
            {posts.map((post: any) => (
              <article key={post.slug} className="category-card">
                <Link href={`/story/${post.slug}`} className="cat-link">

                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(600).height(400).url()}
                      className="cat-img"
                      alt={post.title}
                      width={600}
                      height={400}
                    />
                  )}

                  <h3>{post.title}</h3>

                  {post.subtitle && (
                    <p className="muted">{post.subtitle}</p>
                  )}

                  <p className="time-tag">{timeAgo(post.publishedAt)}</p>
                </Link>
              </article>
            ))}
          </div>

          {/* PAGINATION */}
          <div className="pagination-box">
            {page > 1 && (
              <Link href={`/tag/${slug}?page=${page - 1}`} className="pagination-btn">
                ⬅ Previous
              </Link>
            )}

            {page < totalPages && (
              <Link href={`/tag/${slug}?page=${page + 1}`} className="pagination-btn">
                Next ➜
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
