import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import { getBreakingNews } from "@/sanity/lib/getBreakingNews"
import { getRelatedPosts } from "@/sanity/lib/getRelatedPosts"
import Link from "next/link"
import Image from "next/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import { calculateReadingTime } from "@/sanity/lib/readingTime"
import SocialShare from "@/app/components/SocialShare"

// Helper function to truncate text
function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

// Breadcrumb component
function Breadcrumb({ category }: { category?: any }) {
  if (!category) return null;

  return (
    <nav className="article-breadcrumb" aria-label="Breadcrumb">
      <ol className="breadcrumb-list">
        <li className="breadcrumb-item">
          <Link href="/">Home</Link>
        </li>
        <li className="breadcrumb-separator">›</li>
        <li className="breadcrumb-item">
          <Link href={`/category/${category.slug}`}>{category.title}</Link>
        </li>
      </ol>
    </nav>
  );
}

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
        url: `${siteUrl}/logo.svg`,
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
    <main className="container">
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="b-page-grid">

        <article className="article-container">
          {/* BREADCRUMB */}
          <Breadcrumb category={post.category} />

          {/* HEADLINE */}
          <h1 className="bbc-headline">{post.title}</h1>

          {/* META INFO */}
          <div className="article-meta-row">
            <div className="meta-left">
              <div className="meta-author">
                <span className="meta-label">By </span>
                <Link href={`/author/${post.author.slug}`} className="author-link">
                  {post.author.name}
                </Link>
              </div>
              <div className="meta-details">
                <span className="meta-date">{timeAgo(post.publishedAt)}</span>
                <span className="meta-separator">•</span>
                <span className="meta-category">
                  {post.category?.title && (
                    <Link href={`/category/${post.category.slug}`}>{post.category.title}</Link>
                  )}
                </span>
              </div>
            </div>
            <div className="meta-right">
              <span className="reading-time">{readingTime}</span>
            </div>
          </div>

          {/* HERO IMAGE */}
          {post.image && (
            <div className="article-hero-image">
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
          <div className="bbc-article-body">
            <div>{post.content}</div>
          </div>

          {/* TAGS */}
          {post.tags && post.tags.length > 0 && (
            <div className="article-tags">
              <div className="tags-label">Tags:</div>
              <div className="tags-container">
                {post.tags.map((tag: any) => (
                  <Link key={tag.slug} href={`/tag/${tag.slug}`} className="tag-pill">
                    {tag.title}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* SOCIAL SHARE */}
          <div className="article-share">
            <SocialShare url={`${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/story/${slug}`} title={post.title} />
          </div>

          {/* MORE FROM CATEGORY */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="more-from-category">
              <h2 className="section-heading">More from {post.category?.title}</h2>
              <div className="more-articles-grid">
                {relatedPosts.slice(0, 3).map((relatedPost: any) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/story/${relatedPost.slug}`}
                    className="more-article-card"
                  >
                    {relatedPost.image && (
                      <div className="more-article-image">
                        <Image
                          src={urlFor(relatedPost.image).width(200).height(150).url()}
                          alt={relatedPost.title}
                          width={200}
                          height={150}
                        />
                      </div>
                    )}
                    <div className="more-article-content">
                      <h3 className="more-article-title">{truncateText(relatedPost.title, 80)}</h3>
                      <p className="more-article-meta">{timeAgo(relatedPost.publishedAt)}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </article>

        {/* RIGHT SIDEBAR */}
        <aside className="article-sidebar">
          {/* BREAKING NEWS */}
          <div className="sidebar-section">
            <div className="sidebar-section-header">
              <span className="sidebar-title">Breaking News</span>
            </div>
            <ul className="sidebar-breaking-list">
              {breaking.map((item: any) => (
                <li key={item.slug} className={`breaking-item ${item.slug === slug ? 'active' : ''}`}>
                  <Link href={`/story/${item.slug}`} className="breaking-link">
                    {item.title}
                  </Link>
                  <span className="breaking-time">{timeAgo(item.publishedAt)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RELATED STORIES */}
          {relatedPosts && relatedPosts.length > 0 && (
            <div className="sidebar-section">
              <div className="sidebar-section-header">
                <span className="sidebar-title">Related Stories</span>
              </div>
              <div className="sidebar-related">
                {relatedPosts.slice(0, 4).map((relatedPost: any) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/story/${relatedPost.slug}`}
                    className="related-sidebar-item"
                  >
                    {relatedPost.image && (
                      <div className="related-sidebar-image">
                        <Image
                          src={urlFor(relatedPost.image).width(80).height(80).url()}
                          alt={relatedPost.title}
                          width={80}
                          height={80}
                        />
                      </div>
                    )}
                    <div className="related-sidebar-content">
                      <h4 className="related-sidebar-title">{truncateText(relatedPost.title, 60)}</h4>
                      <span className="related-sidebar-meta">{timeAgo(relatedPost.publishedAt)}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </main>
  )
}
