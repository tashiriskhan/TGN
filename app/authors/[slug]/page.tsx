// Revalidate every 60 seconds for fresh content with caching
export const revalidate = 60;

import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import Link from "next/link"
import Image from "next/image"
import SmartImage from "@/app/components/SmartImage"
import { notFound } from "next/navigation"
import type { Metadata } from "next"
import RightSidebar from "@/app/components/RightSidebar"
import Breadcrumb from "@/app/components/Breadcrumb"
import Pagination from "@/app/components/Pagination"
import { getAuthorStories, getUnifiedSidebarData } from "@/app/lib/storyBridge"
import { siteConfig } from "@/config/site"

const PAGE_SIZE = 10;

const formatSocialUrl = (url: string, platform: 'x' | 'instagram' | 'linkedin') => {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  const clean = url.replace(/^@/, '');
  if (platform === 'x') return `https://x.com/${clean}`;
  if (platform === 'instagram') return `https://instagram.com/${clean}`;
  if (platform === 'linkedin') return `https://linkedin.com/in/${clean}`;
  return url;
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const p = await params
  const slug = p.slug
  let author = null
  try {
    author = await client.fetch(
      `*[_type == "author" && slug.current == $slug][0]{
        name,
        bio
      }`,
      { slug }
    )
  } catch (err) {
    console.error("Failed to fetch author metadata from Sanity:", err)
  }

  if (!author) {
    const derivedName = slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
    return {
      title: `${derivedName} | Journalist & Writer`,
      description: `Read articles and reports written by ${derivedName} on The Ground Narrative.`,
      alternates: {
        canonical: `${siteConfig.url}/authors/${slug}`,
      },
    }
  }

  const description = author.bio 
    ? `${author.bio.slice(0, 155)}...`
    : `Read articles and reports written by ${author.name} on The Ground Narrative.`

  return {
    title: `${author.name} | Journalist & Writer`,
    description,
    alternates: {
      canonical: `${siteConfig.url}/authors/${slug}`,
    },
  }
}

export default async function AuthorPage({ params, searchParams }: any) {
  const p = await params
  const s = await searchParams
  const slug = p.slug
  const page = Number(s.page) || 1

  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  // Fetch author's posts with pagination (merged Sanity + Google Sheets)
  const { stories: allAuthorStories, total: totalPosts } = await getAuthorStories(slug)
  const posts = allAuthorStories.slice(start, end)
  const totalPages = Math.ceil(totalPosts / PAGE_SIZE)

  // Fetch author details including new EEAT fields
  let author = null
  try {
    author = await client.fetch(
      `*[_type == "author" && slug.current == $slug][0]{
        name,
        bio,
        image,
        expertise,
        twitter,
        instagram,
        linkedin
      }`,
      { slug }
    )
  } catch (err) {
    console.error("Failed to fetch author from Sanity:", err)
  }

  if (!author) {
    if (totalPosts === 0) {
      notFound()
    }
    const matchedAuthor = allAuthorStories[0]?.author
    author = {
      name: matchedAuthor?.name || (slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')),
      bio: `Journalist and contributor for The Ground Narrative.`,
      image: null,
      expertise: null,
      twitter: null,
      instagram: null,
      linkedin: null
    }
  }

  // Fetch sidebar data merged from Sanity + Google Sheets
  const { trending, recentStories } = await getUnifiedSidebarData()

  if (!author) {
    notFound();
  }

  const socialLinks = [
    author.twitter && formatSocialUrl(author.twitter, 'x'),
    author.instagram && formatSocialUrl(author.instagram, 'instagram'),
    author.linkedin && formatSocialUrl(author.linkedin, 'linkedin')
  ].filter(Boolean) as string[];

  const jsonLdPerson = {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `https://www.groundnarrative.com/authors/${slug}#person`,
    "name": author.name,
    "jobTitle": "Journalist",
    "description": author.bio || undefined,
    "image": author.image ? urlFor(author.image).width(400).height(400).url() : undefined,
    "sameAs": socialLinks,
    "worksFor": {
      "@type": "NewsMediaOrganization",
      "name": "The Ground Narrative",
      "url": "https://www.groundnarrative.com"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPerson) }}
      />
      <main className="main-content-with-sidebar">
        <div className="container">
          {/* LEFT: MAIN CONTENT */}
          <div className="main-content">
            {/* BREADCRUMB */}
            <Breadcrumb
              items={[
                { label: 'Home', href: '/' },
                { label: author.name, href: `/authors/${slug}` }
              ]}
            />

            {/* Author Header */}
            <section className="author-header">
              {author.image && (
                <Image
                  src={urlFor(author.image).width(200).height(200).url()}
                  alt={author.name}
                  className="author-image"
                  width={200}
                  height={200}
                />
              )}

              <div className="author-info">
                <h1 className="author-name">{author.name}</h1>
                {author.expertise && (
                  <span className="author-expertise text-xs uppercase tracking-wider bg-[#bb1919] text-white px-2 py-1 rounded font-semibold inline-block mb-3">
                    {author.expertise}
                  </span>
                )}
                <p className="author-bio">{author.bio}</p>

                <div className="author-social">
                  {author.twitter && (
                    <a href={formatSocialUrl(author.twitter, 'x')} target="_blank" rel="noopener noreferrer" className="social-link">
                      X (Twitter)
                    </a>
                  )}
                  {author.instagram && (
                    <a href={formatSocialUrl(author.instagram, 'instagram')} target="_blank" rel="noopener noreferrer" className="social-link">
                      Instagram
                    </a>
                  )}
                  {author.linkedin && (
                    <a href={formatSocialUrl(author.linkedin, 'linkedin')} target="_blank" rel="noopener noreferrer" className="social-link">
                      LinkedIn
                    </a>
                  )}
                </div>
              </div>
            </section>

            <header className="category-header">
              <h2 className="category-title">Articles by {author.name}</h2>
              <p className="category-count">
                {totalPosts} {totalPosts === 1 ? 'article' : 'articles'}
              </p>
            </header>

            {/* Author Articles */}
            <section className="category-grid">
              {posts?.length === 0 && (
                <p className="no-stories">No articles found by this author.</p>
              )}

              <div className="category-grid-container">
                {posts.map((post: any) => (
                  <article key={post.slug} className="category-card">
                    <Link href={`/story/${post.slug}`} className="cat-link">

                      <div className="category-image-wrapper">
                        {post.mainImage && (
                          <SmartImage
                            image={post.mainImage}
                            alt={post.title}
                            fill
                            className="cat-img"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        )}
                      </div>

                      <div className="category-card-content">
                        <h3 className="category-card-title">{post.title}</h3>

                        {post.subtitle && (
                          <p className="category-card-summary">{post.subtitle}</p>
                        )}

                        <span className="category-card-date">
                          {new Date(post.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </span>
                      </div>
                    </Link>
                  </article>
                ))}
              </div>
            </section>

            {/* Pagination */}
            {totalPosts > 0 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                basePath={`authors/${slug}`}
              />
            )}
          </div>

          {/* RIGHT: UNIFIED SIDEBAR */}
          <RightSidebar trending={trending} recentStories={recentStories} />
        </div>
      </main>
    </>
  )
}
