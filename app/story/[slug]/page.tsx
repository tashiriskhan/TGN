// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import { getBreakingNews } from "@/sanity/lib/getBreakingNews"
import { getRelatedPosts } from "@/sanity/lib/getRelatedPosts"
import Link from "next/link"
import Image from "next/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import { calculateReadingTime } from "@/sanity/lib/readingTime"
import SocialShare from "@/app/components/SocialShare"
import RightSidebar from "@/app/components/RightSidebar"
import Breadcrumb from "@/app/components/Breadcrumb"
import { PortableText } from "@portabletext/react"
import TableOfContents from "@/app/components/TableOfContents"
import ReadingProgressBar from "@/app/components/ReadingProgressBar"
import BackToTop from "@/app/components/BackToTop"
import { getTrending } from "@/sanity/lib/getTrending"

// Helper function to truncate text
function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
       title,
       subtitle,
       body,
       mainImage,
       publishedAt,
       author->{
         name,
         image
       },
       categories[]->{
         title,
         "slug": slug.current
       }[0]
     }`,
    { slug }
  )

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const url = `${siteUrl}/story/${slug}`

  return {
    title: post?.title || "The Ground Narrative",
    description:
      post?.subtitle ||
      (post?.body ? post.body.slice(0, 120) : "Latest news from The Ground Narrative"),
    openGraph: {
      title: post?.title,
      description: post?.subtitle || post?.body?.slice(0, 120),
      url,
      siteName: 'The Ground Narrative',
      images: post?.mainImage ? [
        {
          url: urlFor(post.mainImage).width(1200).height(630).url(),
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
      description: post?.subtitle || post?.body?.slice(0, 120),
      images: post?.mainImage ? [urlFor(post.mainImage).width(1200).height(630).url()] : [],
    },
  }
}

export default async function StoryPage({ params }: any) {
  const { slug } = await params

  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      body,
      publishedAt,
      author->{
      name,
      bio,
      "slug": slug.current,
      image
    },
      mainImage,
      categories[]->{ title, "slug": slug.current }[0],
      tags[]->{ title, "slug": slug.current }
    }`,
    { slug }
  )

  if (!post) return <div>Story not found</div>

  // Get related posts based on category and tags
  const relatedPosts = await getRelatedPosts(
    slug,
    post?.categories?.slug,
    post?.tags?.map((tag: any) => tag.slug) || []
  )

  // Fetch data for sidebar
  const [breaking, trending] = await Promise.all([
    getBreakingNews(),
    getTrending()
  ])

  // Calculate reading time from Portable Text
  const bodyText = post?.body
    ? post.body.map((block: any) => {
        if (block._type === 'block' && block.children) {
          return block.children.map((child: any) => child.text).join('');
        }
        return '';
      }).join(' ')
    : '';
  const readingTime = calculateReadingTime(bodyText);

  // Create JSON-LD structured data
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const url = `${siteUrl}/story/${slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": post.title,
    "description": post.subtitle || (post.body ? post.body.slice(0, 120) : undefined),
    "image": post.mainImage ? urlFor(post.mainImage).width(1200).height(630).url() : undefined,
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
    "articleSection": post.categories?.title,
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
          {post.categories && (
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: post.categories.title, href: `/${post.categories.slug}` }
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
                  <Link href={`/author/${post.author.slug}`} className="author-link">
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
                  {post.categories?.title && (
                    <Link href={`/${post.categories.slug}`}>{post.categories.title}</Link>
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
              <Image
                src={urlFor(post.mainImage).width(1200).height(675).url()}
                alt={post.title}
                className="article-image"
                width={1200}
                height={675}
                priority
              />
            </div>
          )}

          {/* TABLE OF CONTENTS */}
          <TableOfContents body={post.body} />

          {/* ARTICLE CONTENT */}
          <div className="tgn-article-body">
            <div className="article-content">
              <PortableText
                value={post.body}
                components={{
                  types: {
                    image: ({ value }) => {
                      const { asset, alt, caption } = value;
                      return (
                        <figure className="article-image">
                          <Image
                            src={urlFor(asset).width(800).height(450).url()}
                            alt={alt || ''}
                            width={800}
                            height={450}
                          />
                          {caption && <figcaption>{caption}</figcaption>}
                        </figure>
                      );
                    },
                  },
                  marks: {
                    link: ({ value, children }) => {
                      const target = (value?.href || '').startsWith('http') ? '_blank' : undefined;
                      return (
                        <a href={value?.href} target={target} rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
                          {children}
                        </a>
                      );
                    },
                  },
                  block: {
                    h1: ({ value }) => {
                      const text = value.children.map((child: any) => child.text).join(' ');
                      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                      return (
                        <h1 id={id}>
                          {value.children.map((child: any, index: number) => (
                            <span key={index}>{child.text}</span>
                          ))}
                        </h1>
                      );
                    },
                    h2: ({ value }) => {
                      const text = value.children.map((child: any) => child.text).join(' ');
                      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                      return (
                        <h2 id={id}>
                          {value.children.map((child: any, index: number) => (
                            <span key={index}>{child.text}</span>
                          ))}
                        </h2>
                      );
                    },
                    h3: ({ value }) => {
                      const text = value.children.map((child: any) => child.text).join(' ');
                      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                      return (
                        <h3 id={id}>
                          {value.children.map((child: any, index: number) => (
                            <span key={index}>{child.text}</span>
                          ))}
                        </h3>
                      );
                    },
                    h4: ({ value }) => {
                      const text = value.children.map((child: any) => child.text).join(' ');
                      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
                      return (
                        <h4 id={id}>
                          {value.children.map((child: any, index: number) => (
                            <span key={index}>{child.text}</span>
                          ))}
                        </h4>
                      );
                    },
                  },
                }}
              />
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
              <h2 className="section-heading">More from {post.categories?.title}</h2>
              <div className="more-articles-grid">
                {relatedPosts.slice(0, 3).map((relatedPost: any) => (
                  <Link
                    key={relatedPost.slug}
                    href={`/story/${relatedPost.slug}`}
                    className="more-article-card"
                  >
                    {relatedPost.mainImage && (
                      <div className="more-article-image">
                        <Image
                          src={urlFor(relatedPost.mainImage).width(200).height(150).url()}
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
          breaking={breaking}
          trending={trending}
          relatedPosts={relatedPosts}
          category={post.categories?.title}
        />
      </div>
    </main>

    {/* Back to Top Button */}
    <BackToTop />
    </>
  )
}
