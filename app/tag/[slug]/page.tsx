import { client } from "@/sanity/lib/sanity"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

const PAGE_SIZE = 10

export default async function TagPage({ params, searchParams }: any) {
  // FIX: unwrap async params (Next.js 15/16)
  const p = await params
  const s = await searchParams

  const slug = p.slug
  const page = Number(s.page) || 1

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  // Tag name
  const tag = await client.fetch(
    `*[_type == "tag" && slug.current == $slug][0]{ title }`,
    { slug }
  )

  // Posts with this tag (paginated)
  const posts = await client.fetch(
    `*[_type == "post" && $slug in tags[]->slug.current]
      | order(publishedAt desc)[$start...$end]{
        title,
        subtitle,
        image,
        publishedAt,
        "slug": slug.current
      }
    `,
    { slug, start, end }
  )

  // Total number of posts with this tag → FIXED!
  const totalPosts = await client.fetch(
    `count(*[_type == "post" && $slug in tags[]->slug.current])`,
    { slug }
  )

  const totalPages = Math.ceil(totalPosts / PAGE_SIZE)

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>#{tag?.title || slug}</h1>

      <div className="list-cards" style={{ marginTop: 20 }}>
        {posts.map((post: any) => (
          <article key={post.slug} className="card">
            <Link href={`/story/${post.slug}`} className="card-link">
              {post.image && (
                <img src={urlFor(post.image).url()} alt={post.title} />
              )}
              <h3>{post.title}</h3>
              <p className="muted">{timeAgo(post.publishedAt)}</p>
            </Link>
          </article>
        ))}
      </div>

      {/* Pagination */}
      <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
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
    </main>
  )
}
