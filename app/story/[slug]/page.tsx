import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import { getBreakingNews } from "@/sanity/lib/getBreakingNews"
import Link from "next/link"
import { timeAgo } from "@/sanity/lib/timeAgo"

// ⬇️ ADD THIS HERE
export async function generateMetadata({ params }: any) {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
       title,
       subtitle,
       "description": content
     }`,
    { slug }
  )

  return {
    title: post?.title || "The Ground Narrative",
    description:
      post?.subtitle ||
      (post?.description ? post.description.slice(0, 120) : "Latest news from The Ground Narrative"),
  }
}
// ⬆️ END OF METADATA


const breaking = await getBreakingNews() 
export default async function StoryPage({ params }: any) {
  const { slug } = await params



 


  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      content,
      publishedAt,
      author->{
      name,
      bio,
      "slug": slug.current,
      image
    },
      image,
      category->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }`,
    { slug }
  )

  if (!post) return <div>Story not found</div>

  return (

    
    // MAIN: 2 columns (center article + right sidebar placeholder)
    <main className="container">
      <div className="b-page-grid">
        {/* MAIN CENTER COLUMN */}
        <section className="hero-col">
          <div className="section-block">
            {/* DATE */}
{post.publishedAt && (
  <div className="muted" style={{ fontSize: 13, marginBottom: 10 }}>
    {new Date(post.publishedAt).toLocaleString()}
  </div>
)}

{/* TITLE */}
<h1 style={{ fontSize: 28, margin: "5px 0 10px 0" }}>
  {post.title}
</h1>

{/* CATEGORY + TIME */}
<p className="meta" style={{ fontSize: 14, marginBottom: 6,}}>
  {post.category && (
    <Link href={`/category/${post.category.slug}`}>
      {post.category.title}
    </Link>
  )}

  {post.publishedAt && (
    <> • {new Date(post.publishedAt).toLocaleDateString()}</>
  )}
</p>

{/* AUTHOR */}
{post.author && (
  <p className="meta" style={{ fontSize: 14, marginBottom: 16 }}>
    By{" "}
    <Link href={`/author/${post.author.slug}`}>
      {post.author.name}
    </Link>
  </p>
)}


            {/* IMAGE */}
            {post.image && (
              <img
                src={urlFor(post.image).url()}
                alt={post.title}
                style={{
                  width: "70%",
                  height:'40%',
                  borderRadius: 10,
                  margin: "12px 0 20px",
                  display: "block",
                }}
              />
            )}

            {/* CONTENT */}
            <div style={{ fontSize: 15, lineHeight: 1.6 }}>
              {post.content}
            </div>

            {/* TAGS */}
            {post.tags && post.tags.length > 0 && (
              <p style={{ marginTop: 16 }}>
                Tags:{" "}
                {post.tags.map((tag: any) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    style={{ marginRight: 8 }}
                  >
                    #{tag.title}
                  </Link>
                ))}
              </p>
            )}
          </div>

          {/* COMMENTS BLOCK */}
          <div className="section-block" style={{ marginTop: 16 }}>
            <h2 className="section-title">Post your opinion</h2>

            <div
              style={{
                background: "#f4f4f4",
                padding: 16,
                borderRadius: 4,
                marginBottom: 22,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <button
                style={{
                  background: "var(--blue)",
                  color: "#fff",
                  border: 0,
                  padding: "8px 22px",
                  borderRadius: 20,
                  fontSize: 13,
                  cursor: "pointer",
                }}
              >
                Sign in
              </button>
            </div>

            <div
              style={{
                textAlign: "center",
                padding: "40px 0",
                borderTop: "1px solid #eee",
              }}
            >
              <img
                src="https://via.placeholder.com/180x120"
                alt="Comment illustration"
                style={{ display: "block", margin: "0 auto 16px", opacity: 0.7 }}
              />
              <p style={{ fontSize: 15, margin: "0 0 4px" }}>
                What's on your mind?
              </p>
              <p className="muted" style={{ margin: 0 }}>
                Be the first to comment.
              </p>
            </div>
          </div>
        </section>

        {/* RIGHT SIDEBAR: TOP NEWS */}
          <aside className="right-col">
          <div className="side-top">
  <div className="breaking-header"><span>BREAKING NEWS</span>
 
  </div>

  <ul className="breaking-list">
    {breaking.map((post: any) => (
      <li key={post.slug}>
        <Link 
          href={`/breaking/${post.slug}`} 
          className="breaking-link"
        >
          {post.title}
        </Link>

        <div className="time">{timeAgo(post.publishedAt)}</div>
      </li>
    ))}
  </ul>
</div>
          </aside>
      </div>
    </main>
  )
}
