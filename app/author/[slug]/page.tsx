import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import Image from "next/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import RightSidebar from "@/app/components/RightSidebar"

const PAGE_SIZE = 10

export default async function AuthorPage({ params, searchParams }: any) {
  const p = await params
  const s = await searchParams
  const slug = p.slug
  const page = Number(s.page) || 1

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  // Fetch author details
  const author = await client.fetch(
    `*[_type == "author" && slug.current == $slug][0]{
      name,
      bio,
      image,
      twitter,
      instagram
    }`,
    { slug }
  )

  // Fetch author's posts with pagination
  const posts = await client.fetch(
    `*[_type == "post" && author->slug.current == $slug]
      | order(publishedAt desc)[$start...$end]{
        title,
        subtitle,
        publishedAt,
        image,
        "slug": slug.current
      }`,
    { slug, start, end }
  )

  // Get total count for pagination
  const totalPosts = await client.fetch(
    `count(*[_type == "post" && author->slug.current == $slug])`,
    { slug }
  )

  const totalPages = Math.ceil(totalPosts / PAGE_SIZE)

  if (!author) return <main className="main-content-with-sidebar"><div className="container"><p>Author not found.</p></div></main>

  return (
    <main className="main-content-with-sidebar">
      <div className="container">
        {/* LEFT: MAIN CONTENT */}
        <div className="main-content">
          {/* Author Header */}
          <section className="author-header">
            {author.image && (
              <Image
                src={urlFor(author.image).width(200).height(200).url()}
                alt={author.name}
                className="author-image"
                width={200}
                height={200}
              />
            )}

            <div className="author-info">
              <h1 className="author-name">{author.name}</h1>
              <p className="author-bio">{author.bio}</p>

              <div className="author-social">
                {author.twitter && (
                  <a href={author.twitter} target="_blank" rel="noopener noreferrer" className="social-link">
                    Twitter
                  </a>
                )}
                {author.instagram && (
                  <a href={author.instagram} target="_blank" rel="noopener noreferrer" className="social-link">
                    Instagram
                  </a>
                )}
              </div>
            </div>
          </section>

          <h2 className="author-articles-title">Articles by {author.name}</h2>

          {/* Author Articles */}
          <div className="author-posts-grid">
            {posts.map((post: any) => (
              <article key={post.slug} className="author-post-card">
                <Link href={`/story/${post.slug}`} className="author-post-link">
                  {post.image && (
                    <Image
                      src={urlFor(post.image).width(500).height(350).url()}
                      alt={post.title}
                      className="author-post-image"
                      width={500}
                      height={350}
                    />
                  )}

                  <h3 className="author-post-title">{post.title}</h3>
                  <p className="author-post-date">{timeAgo(post.publishedAt)}</p>
                </Link>
              </article>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-box">
              {page > 1 && (
                <Link href={`/author/${slug}?page=${page - 1}`} className="pagination-btn">
                  ⬅ Previous
                </Link>
              )}
              <span className="pagination-info">
                Page {page} of {totalPages}
              </span>
              {page < totalPages && (
                <Link href={`/author/${slug}?page=${page + 1}`} className="pagination-btn">
                  Next ➜
                </Link>
              )}
            </div>
          )}
        </div>

        {/* RIGHT: UNIFIED SIDEBAR */}
        <RightSidebar />
      </div>
    </main>
  )
}
