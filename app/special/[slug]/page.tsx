import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import Link from "next/link"

export async function getPost(slug: string) {
  try {
    console.log("getPost received slug:", slug)  // Debug log
    return client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        content,
        image
      }`,
      { slug }
    )
  } catch (err) {
    console.error("Fetch error:", err)
    return null
  }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params  // ← Fix #1: await params
  const post = await getPost(slug)
  
  console.log("Final slug used:", slug)
  console.log("Fetched post:", post)

  return (
    <main style={{ padding: 20 }}>
      {post.image && (
        <img 
          src={urlFor(post.image).url()}
          alt={post.title}
          style={{ width: "30%", borderRadius: 10, margin: "20px 0" }}
        />
      )}

      <h1>{post.title}</h1>
      <p className="meta">
        {timeAgo(post.publishedAt)} • By {post.author}
      </p>

      <p>{post.content}</p>
      {/* Category */}
{post.category && (
  <p>
    Category:{" "}
    <Link href={`/category/${post.category.slug}`}>
      {post.category.title}
    </Link>
  </p>
)}

{/* Tags */}
{post.tags && post.tags.length > 0 && (
  <p>
    Tags:{" "}
    {post.tags.map((tag: any) => (
      <Link 
        key={tag.slug}
        href={`/tag/${tag.slug}`}
        style={{ marginRight: "8px" }}
      >
        #{tag.title}
      </Link>
    ))}
  </p>
)}

    </main>
  )
}
