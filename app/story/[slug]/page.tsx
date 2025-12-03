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
          
                      <section className="article-container">

  {/* HEADLINE */}
  <h1 className="bbc-headline">{post.title}</h1>

 {/* META BAR (BBC Style, Clean Layout) */}
<div className="bbc-meta">

  {/* Author line */}
  <div className="bbc-meta-line">
    <span>By:</span>
    <Link href={`/author/${post.author.slug}`} className="bbc-author">
      {post.author.name}
    </Link>
  </div>

  {/* Date + Time line */}
  <div className="bbc-meta-line">
    <span>{new Date(post.publishedAt).toLocaleDateString()}</span>
    <span>•</span>
    <span>{new Date(post.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
  </div>
</div>

  {/* HERO IMAGE */}
  {post.image && (
    <div className="bbc-hero-wrapper">
      <img
        src={urlFor(post.image).url()}
        alt={post.title}
        className="article-image"
      />
    </div>
  )}

  {/* ARTICLE CONTENT */}
  <article className="bbc-article-body">
    {post.content}
  </article>

  {/* TAGS */}
  {post.tags && post.tags.length > 0 && (
    <div className="bbc-tags">
      {post.tags.map((tag: any) => (
        <Link key={tag.slug} href={`/tag/${tag.slug}`} className="tag-pill">
  {tag.title}
</Link>
      ))}
    </div>
  )}    
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
