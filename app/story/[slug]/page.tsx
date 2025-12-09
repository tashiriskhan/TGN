import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import { getBreakingNews } from "@/sanity/lib/getBreakingNews"
import { getRelatedPosts } from "@/sanity/lib/getRelatedPosts"
import Link from "next/link"
import Image from "next/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import { calculateReadingTime } from "@/sanity/lib/readingTime"
import SocialShare from "@/app/components/SocialShare"

// ⬇️ ADD THIS HERE
export async function generateMetadata({ params }: any) {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
       title,
       subtitle,
       content,
       image,
       publishedAt,
       author->{
         name,
         image
       },
       category->{
         title
       }
     }`,
    { slug }
  )

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const url = `${siteUrl}/story/${slug}`

  return {
    title: post?.title || "The Ground Narrative",
    description:
      post?.subtitle ||
      (post?.content ? post.content.slice(0, 120) : "Latest news from The Ground Narrative"),
    openGraph: {
      title: post?.title,
      description: post?.subtitle || post?.content?.slice(0, 120),
      url,
      siteName: 'The Ground Narrative',
      images: post?.image ? [
        {
          url: urlFor(post.image).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      locale: 'en_US',
      type: 'article',
      publishedTime: post?.publishedAt,
      authors: post?.author?.name ? [post.author.name] : [],
      section: post?.category?.title,
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description: post?.subtitle || post?.content?.slice(0, 120),
      images: post?.image ? [urlFor(post.image).width(1200).height(630).url()] : [],
    },
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

  // Get related posts based on category and tags
  const relatedPosts = await getRelatedPosts(
    slug,
    post?.category?.slug,
    post?.tags?.map((tag: any) => tag.slug) || []
  )

  // Calculate reading time
  const readingTime = calculateReadingTime(post?.content || "")

  // Create JSON-LD structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const url = `${siteUrl}/story/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.subtitle || post.content?.slice(0, 120),
    "image": post.image ? urlFor(post.image).width(1200).height(630).url() : undefined,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author.name,
    },
    "publisher": {
      "@type": "Organization",
      "name": "The Ground Narrative",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.svg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url,
    },
    "articleSection": post.category?.title,
    "keywords": post.tags?.map((tag: any) => tag.title).join(", "),
  }

  if (!post) return <div>Story not found</div>

  return (
    // MAIN: 2 columns (center article + right sidebar)
    <main className="container">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="b-page-grid">

        <section className="article-container">
          {/* HEADLINE */}
          <h1 className="bbc-headline">{post.title}</h1>

          {/* META */}
          <div className="bbc-article-meta">
            <div className="bbc-article-meta-left">
              <div>
                <span>By </span>
                <Link href={`/author/${post.author.slug}`} className="author">
                  {post.author.name}
                </Link>
              </div>
              <div>
                <span className="date">{new Date(post.publishedAt).toLocaleDateString()}</span>
                <span> • </span>
                <span className="time">
                  {new Date(post.publishedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
            </div>
            <span className="reading-time">{readingTime}</span>
          </div>

          {/* HERO IMAGE */}
          {post.image && (
            <div className="bbc-hero-wrapper">
              <Image
                src={urlFor(post.image).width(1200).height(675).url()}
                alt={post.title}
                className="article-image"
                width={1200}
                height={675}
                priority
              />
            </div>
          )}

          {/* ARTICLE CONTENT */}
          <article className="bbc-article-body">
            <div>{post.content}</div>
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

          {/* RELATED ARTICLES */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="related-articles">
              <h2 className="related-title">Related Articles</h2>
              <div className="related-grid">
                {relatedPosts.map((relatedPost: any) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/story/${relatedPost.slug}`}
                    className="related-card"
                  >
                    {relatedPost.image && (
                      <Image
                        src={urlFor(relatedPost.image).width(300).height(200).url()}
                        alt={relatedPost.title}
                        className="related-image"
                        width={300}
                        height={200}
                      />
                    )}
                    <h3 className="related-card-title">{relatedPost.title}</h3>
                    <p className="related-card-meta">
                      {relatedPost.category?.title} • {timeAgo(relatedPost.publishedAt)}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* SOCIAL SHARE */}
          <SocialShare url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/story/${slug}`} title={post.title} />
        </section>

        {/* RIGHT SIDEBAR: BREAKING NEWS */}
        <aside className="right-col">
          <div className="side-top">
            <div className="breaking-header">
              <span>BREAKING NEWS</span>
            </div>

            <ul className="breaking-list">
              {breaking.map((post: any) => (
                <li key={post.slug}>
                  <Link href={`/story/${post.slug}`} className="breaking-link">
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
