import Link from "next/link"
import { getAllFeatured } from "@/sanity/lib/getAllFeatured"
import { urlFor } from "@/sanity/lib/image"

export default async function FeaturesPage() {
  const posts = await getAllFeatured()

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      
      <h1 style={{ marginBottom: "20px" }}>Featured Stories</h1>

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
