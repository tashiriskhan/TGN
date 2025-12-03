import Link from "next/link"
import { getBreakingNews } from "@/sanity/lib/getBreakingNews"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function BreakingPage() {
  const posts = await getBreakingNews()

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ marginBottom: "20px" }}>Breaking News</h1>

      <div className="list-cards">
        
        {posts.map((post: any) => (
          <Link 
            href={`/story/${post.slug}`} 
            key={post.slug}
            className="card"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            {post.image && (
              <img 
                src={urlFor(post.image).width(400).url()} 
                alt={post.title}
              />
            )}

            <h3>{post.title}</h3>
          </Link>
        ))}
      </div>
    </main>
  )
}
