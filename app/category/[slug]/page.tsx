import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"

const PAGE_SIZE = 10

export default async function CategoryPage({ params, searchParams }: any) {
  // FIX: unwrap async params
  const p = await params
  const s = await searchParams

  const slug = p.slug
  const page = Number(s.page) || 1

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  // Category title
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{ title }`,
    { slug }
  )

  // Posts in category with pagination
  const posts = await client.fetch(
    `*[_type == "post" && category->slug.current == $slug]
      | order(publishedAt desc)[$start...$end] {
        title,
        subtitle,
        image,
        publishedAt,
        "slug": slug.current
      }`,
    { slug, start, end }
  )

  // total number of posts
  const totalPosts = await client.fetch(
    `count(*[_type == "post" && category->slug.current == $slug])`,
    { slug }
  )

  const totalPages = Math.ceil(totalPosts / PAGE_SIZE)

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Category: {category?.title || slug}</h1>

      <div className="list-cards" style={{ marginTop: 20 }}>
        {posts.map((post: any) => (
          <article key={post.slug} className="card">
            <Link href={`/story/${post.slug}`} className="card-link">
              {post.image && (
                <img
                  src={urlFor(post.image).width(200).url()}
                  alt={post.title}
                  
                />
              )}
              <h3>{post.title}</h3>
              {post.subtitle && <p>{post.subtitle}</p>}
            </Link>
          </article>
        ))}
      </div>

      {/* PAGINATION BUTTONS */}
      <div style={{ marginTop: "30px", display: "flex", gap: "10px" }}>
        {page > 1 && (
          <Link href={`/category/${slug}?page=${page - 1}`} className="pagination-btn">
            ⬅ Previous
          </Link>
        )}

        {page < totalPages && (
          <Link href={`/category/${slug}?page=${page + 1}`} className="pagination-btn">
            Next ➜
          </Link>
        )}
      </div>
    </main>
  )
}
