// Revalidate every 60 seconds for fresh content with caching
export const revalidate = 60;

import { urlFor } from "@/sanity/lib/image"
import SmartImage from "@/app/components/SmartImage"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { timeAgo } from "@/sanity/lib/timeAgo"
import { calculateReadingTime } from "@/sanity/lib/readingTime"
import SocialShare from "@/app/components/SocialShare"
import RightSidebar from "@/app/components/RightSidebar"
import Breadcrumb from "@/app/components/Breadcrumb"
import ArticlePortableText from "@/app/components/PortableTextComponents"
import TableOfContents from "@/app/components/TableOfContents"
import ReadingProgressBar from "@/app/components/ReadingProgressBar"
import BackToTop from "@/app/components/BackToTop"
import { truncateText } from "@/app/components/utils"
import { siteConfig } from "@/config/site"
import { getStoryBySlug, getRelatedStories, getUnifiedSidebarData } from "@/app/lib/storyBridge"

async function getPost(slug: string) {
  return getStoryBySlug(slug)
}

function resolveImageUrl(image: any) {
  if (!image) return "";
  if (typeof image === "string") return image;
  try {
    return urlFor(image).width(1200).height(630).url();
  } catch (e) {
    return "";
  }
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params
  const post = await getPost(slug)

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url
  const url = `${siteUrl}/story/${slug}`

  // Use excerpt as fallback, not body (body is Portable Text array)
  const description = post?.excerpt || post?.subtitle || "Latest news from The Ground Narrative"

  return {
    title: post?.title || "The Ground Narrative",
    description: description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: post?.title,
      description: description,
      url,
      siteName: 'The Ground Narrative',
      images: post?.mainImage ? [
        {
          url: resolveImageUrl(post.mainImage),
          width: 1200,
          height: 630,
          alt: post.title,
        }
      ] : [],
      locale: 'en_US',
      type: 'article',
      publishedTime: post?.publishedAt,
      authors: post?.author?.name ? [post.author.name] : [],
      section: post?.categories?.[0]?.title,
    },
    twitter: {
      card: 'summary_large_image',
      title: post?.title,
      description: description,
      images: post?.mainImage ? [resolveImageUrl(post.mainImage)] : [],
    },
  }
}

export default async function StoryPage({ params }: any) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) notFound()

  // `categories` is an array of all categories this post is in. Pick the first for breadcrumbs and meta.
  const primaryCategory = post?.categories?.[0] || null

  // Get related posts based on category and tags — now includes Google Sheet stories
  const relatedPosts = await getRelatedStories(
    slug,
    primaryCategory?.slug,
    post?.tags?.map((tag: any) => tag.slug) || []
  )

  // Fetch sidebar data merged from Sanity + Google Sheets
  const { trending, recentStories } = await getUnifiedSidebarData(slug)

  // Calculate reading time from Portable Text or plain text string
  const bodyText = typeof post?.body === 'string'
    ? post.body
    : Array.isArray(post?.body)
      ? post.body.map((block: any) => {
          if (block._type === 'block' && block.children) {
            return block.children.map((child: any) => child.text).join('');
          }
          return '';
        }).join(' ')
      : '';
  const readingTime = calculateReadingTime(bodyText);

  // Create JSON-LD structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || siteConfig.url
  const url = `${siteUrl}/story/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.excerpt || post.subtitle || (bodyText ? bodyText.slice(0, 150) : undefined),
    "image": post.mainImage ? resolveImageUrl(post.mainImage) : undefined,
    "datePublished": post.publishedAt,
    "dateModified": post.publishedAt,
    "author": {
      "@type": "Person",
      "name": post.author?.name || "Unknown",
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
    "articleSection": post?.categories?.[0]?.title,
    "keywords": post.tags?.map((tag: any) => tag.title).join(", "),
  }

  return (
    <>
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      <main className="container">
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <div className="b-page-grid">

        <article className="article-container">
          {/* BREADCRUMB */}
          {primaryCategory && (
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: primaryCategory.title, href: `/${primaryCategory.slug}` },
                { label: post.title, href: `/story/${slug}` }
              ]}
            />
          )}

          {/* HEADLINE */}
          <h1 className="tgn-headline">{post.title}</h1>

          {/* EXCERPT */}
          {post.excerpt && (
            <div className="article-excerpt">
              <p>{post.excerpt}</p>
            </div>
          )}

          {/* META INFO */}
          <div className="article-meta-row">
            <div className="meta-left">
              <div className="meta-author">
                <span className="meta-label">By </span>
                {post.author?.slug && post.author?.name ? (
                  <Link href={`/authors/${post.author.slug}`} className="author-link">
                    {post.author.name}
                  </Link>
                ) : (
                  <span className="author-link">{post.author?.name || 'Unknown'}</span>
                )}
              </div>
              <div className="meta-details">
                <span className="meta-date">{timeAgo(post.publishedAt)}</span>
                <span className="meta-separator">•</span>
                <span className="meta-category">
                  {primaryCategory?.title && (
                    <Link href={`/${primaryCategory.slug}`}>{primaryCategory.title}</Link>
                  )}
                </span>
              </div>
            </div>
            <div className="meta-right">
              <span className="reading-time">{readingTime}</span>
            </div>
          </div>

          {/* HERO IMAGE */}
          {post.mainImage && (
            <div className="article-hero-image">
              <SmartImage
                image={post.mainImage}
                alt={post.title}
                width={1200}
                height={675}
                priority
                className="article-image"
              />
            </div>
          )}

          {/* TABLE OF CONTENTS */}
          <TableOfContents body={post.body} />

          {/* ARTICLE CONTENT */}
          <div className="tgn-article-body">
            <div className="article-content">
              <ArticlePortableText value={post.body} />
            </div>
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
            <SocialShare title={post.title} />
          </div>

          {/* MORE FROM CATEGORY */}
          {relatedPosts && relatedPosts.length > 0 && (
            <section className="more-from-category">
              <h2 className="section-heading">More from {primaryCategory?.title}</h2>
              <div className="more-articles-grid">
                {relatedPosts.slice(0, 3).map((relatedPost: any) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/story/${relatedPost.slug}`}
                    className="more-article-card"
                  >
                    {relatedPost.mainImage && (
                      <div className="more-article-image">
                        <SmartImage
                          image={relatedPost.mainImage}
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
        <RightSidebar
          trending={trending}
          relatedPosts={relatedPosts}
          category={primaryCategory?.title}
          recentStories={recentStories}
        />
      </div>
    </main>

    {/* Back to Top Button */}
    <BackToTop />
    </>
  )
}
