import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function AuthorPage({ params }: any) {
  const p = await params
  const slug = p.slug

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

  // Fetch author's posts
  const posts = await client.fetch(
    `*[_type == "post" && author->slug.current == $slug]
      | order(publishedAt desc){
        title,
        subtitle,
        publishedAt,
        image,
        "slug": slug.current
      }`,
    { slug }
  )

  if (!author) return <main className="container">Author not found.</main>

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      {/* Author Header */}
      <section style={{ display: "flex", gap: "20px", marginBottom: "30px" }}>
        {author.image && (
          <img 
            src={urlFor(author.image).width(200).url()}
            alt={author.name}
            style={{ borderRadius: "10px" }}
          />
        )}

        <div>
          <h1>{author.name}</h1>
          <p>{author.bio}</p>

          <div style={{ marginTop: 10 }}>
            {author.twitter && (
              <a href={author.twitter} target="_blank" className="muted" style={{ marginRight: 10 }}>
                Twitter
              </a>
            )}
            {author.instagram && (
              <a href={author.instagram} target="_blank" className="muted">
                Instagram
              </a>
            )}
          </div>
        </div>
      </section>

      <h2>Articles by {author.name}</h2>

      {/* Author Articles */}
      <div className="list-cards" style={{ marginTop: 20 }}>
        {posts.map((post: any) => (
          <article key={post.slug} className="card">
            <Link href={`/story/${post.slug}`} className="card-link">
              {post.image && (
                <img src={urlFor(post.image).width(500).url()} alt={post.title} />
              )}

              <h3>{post.title}</h3>
              <p className="muted">{timeAgo(post.publishedAt)}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
