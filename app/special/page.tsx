import Link from "next/link"
import { getAllSpecial } from "@/sanity/lib/getAllSpecial"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function SpecialLandingPage() {
  const posts = await getAllSpecial()

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ marginBottom: "20px" }}>Special Stories</h1>

      <div className="list-cards">
        {posts.map((post: any) => (
          <article className="card" key={post.slug}>
            <Link 
              href={`/story/${post.slug}`}
              className="card-link"
            >
              {post.image && (
                <img 
                  src={urlFor(post.image).width(400).url()} 
                  alt={post.title} 
                />
              )}

              <h3>{post.title}</h3>
              <p className="muted">{post.subtitle}</p>
              <p className="muted">{timeAgo(post.publishedAt)}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
