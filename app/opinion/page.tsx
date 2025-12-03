import Link from "next/link"
import { getOpinion } from "@/sanity/lib/getOpinion"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function OpinionPage() {
  const posts = await getOpinion()

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ marginBottom: "20px" }}>Opinion Articles</h1>

      <div className="opinion-list">
        {posts.map((post: any) => (
          <article className="op-item" key={post.slug}>
            <Link href={`/story/${post.slug}`} className="opinion-link">
              {post.image && (
                <img 
                  src={urlFor(post.image).width(80).height(80).url()}
                  alt={post.title}
                />
              )}

              <div>
                <h4>{post.title}</h4>
                <p className="muted">{post.subtitle}</p>
                <p className="muted">{timeAgo(post.publishedAt)}</p>
              </div>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
