import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import Image from "next/image"

const PAGE_SIZE = 10

export default async function CategoryPage({ params, searchParams }: any) {
  // FIX: unwrap async params
  const p = await params
  const s = await searchParams

  const slug = p.slug
  const page = Number(s.page) || 1

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  // Get category title
  const category = await client.fetch(
    `*[_type == "category" && slug.current == $slug][0]{ title }`,
    { slug }
  )

  // Fetch posts inside this category
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

  const totalPosts = await client.fetch(
    `count(*[_type == "post" && category->slug.current == $slug])`,
    { slug }
  )

  const totalPages = Math.ceil(totalPosts / PAGE_SIZE)

  return (
    <main className="container category-page">

      {/* CATEGORY HEADER */}
      <header className="category-header">
        <h1>{category?.title || slug}</h1>
        <p className="muted">{totalPosts} articles</p>
      </header>

      {/* POSTS GRID (BBC STYLE) */}
      <section className="category-grid">
        {posts?.length === 0 && (
          <p>No stories found in this category.</p>
        )}

        {posts.map((post: any) => (
          <article key={post.slug} className="category-card">
            <Link href={`/story/${post.slug}`} className="cat-link">

              {post.image && (
                <Image
                  src={urlFor(post.image).width(400).height(300).url()}
                  alt={post.title}
                  className="cat-img"
                  width={400}
                  height={300}
                />
              )}

              <h3>{post.title}</h3>

              {post.subtitle && (
                <p className="muted">{post.subtitle}</p>
              )}

              <span className="time-tag">
                {new Date(post.publishedAt).toDateString()}
              </span>
            </Link>
          </article>
        ))}
      </section>

      {/* PAGINATION */}
      <div className="pagination-box">
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
