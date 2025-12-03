import Link from "next/link"
import { getTrending } from "@/sanity/lib/getTrending"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function TrendingPage() {
  const posts = await getTrending()

  return (
    <main className="container" style={{ padding: "40px 0" }}>

      
      <h1 style={{ marginBottom: "20px" }}>Trending News</h1>

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

              <h4>{post.title}</h4>
              <p className="muted">{timeAgo(post.publishedAt)}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
