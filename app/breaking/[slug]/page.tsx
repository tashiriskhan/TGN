import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import { getBreakingNews } from "@/sanity/lib/getBreakingNews"
import { timeAgo } from "@/sanity/lib/timeAgo"
import Link from "next/link"


const breaking = await getBreakingNews() 

export async function getPost(slug: string) {
  try {
    console.log("getPost received slug:", slug)
    return client.fetch(
      `*[_type == "post" && slug.current == $slug][0]{
        title,
        content,
        image,
        author,
        category->{title, slug},
        tags[]->{title, slug}
      }`,
      { slug }
    )
  } catch (err) {
    console.error("Fetch error:", err)
    return null
  }
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return <div>Post not found for slug: {slug}</div>

  return (
    <>
       {/* MAIN: 2 columns (center article + right sidebar) */}
      <main className="container">
        <div className="b-page-grid">
          {/* MAIN CENTER COLUMN */}
          <section className="hero-col">
            <div className="section-block">
              {/* Assuming you add date/time later from Sanity */}
              <div className="muted" style={{ fontSize: 13, marginBottom: 10 }}>
                11:50, 03-Dec-2025
              </div>

              

              {/* Author / category meta */}
              <p className="meta" style={{ fontSize: 13, marginBottom: 12 }}>
                {post.author && <>By {post.author}</>}
                {post.category && (
                  <>
                    {" "}
                    |{" "}
                    <Link
                      href={`/category/${post.category.slug.current ?? post.category.slug}`}
                    >
                      {post.category.title}
                    </Link>
                  </>
                )}
              </p>

              {/* IMAGE */}
              {post.image && (
                <img
                  src={urlFor(post.image).url()}
                  alt={post.title}
                  style={{
                    width: "30%",
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
                      key={tag.slug.current ?? tag.slug}
                      href={`/tag/${tag.slug.current ?? tag.slug}`}
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
  <div className="breaking-header"><span><a href="/breaking">BREAKING NEWS</a></span>
 
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

            {/* Simple mobile nav toggle (optional; or move to client component) */}
      
    </>
  )
}
