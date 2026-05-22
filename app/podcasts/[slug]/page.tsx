import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getPodcastBySlug } from "@/sanity/lib/getPodcastBySlug"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import type { Metadata } from "next"

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const podcast = await getPodcastBySlug(slug)

  if (!podcast) {
    return {
      title: "Podcast Not Found",
    }
  }

  const description = podcast.description
    ? podcast.description.slice(0, 155)
    : `Listen to our latest podcast episode: ${podcast.title} on The Ground Narrative.`

  return {
    title: `${podcast.title} | Podcast Episode & Audio Journalism`,
    description,
    alternates: {
      canonical: `https://www.groundnarrative.com/podcasts/${slug}`,
    },
    openGraph: {
      title: podcast.title,
      description,
      type: "music.song",
      url: `https://www.groundnarrative.com/podcasts/${slug}`,
      images: podcast.thumbnail ? [
        {
          url: urlFor(podcast.thumbnail).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: podcast.title,
        }
      ] : [],
    }
  }
}

export default async function PodcastPage({ params }: any) {
  const p = await params
  const slug = p.slug

  const podcast = await getPodcastBySlug(slug)

  if (!podcast) {
    notFound()
  }

  const category = podcast.category || (podcast.categories && podcast.categories[0])

  // Construct PodcastEpisode structured data
  const siteUrl = "https://www.groundnarrative.com"
  const thumbnailUrl = podcast.thumbnail
    ? urlFor(podcast.thumbnail).width(600).height(600).url()
    : undefined

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PodcastEpisode",
    "name": podcast.title,
    "description": podcast.description || `Listen to: ${podcast.title} on The Ground Narrative.`,
    "datePublished": podcast.publishedAt,
    "timeRequired": podcast.duration ? `PT${podcast.duration}` : undefined,
    "associatedMedia": {
      "@type": "MediaObject",
      "contentUrl": podcast.audioUrl
    },
    "image": thumbnailUrl,
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "The Ground Narrative",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.svg`
      }
    },
    "author": {
      "@type": "Person",
      "name": podcast.author?.name || "The Ground Narrative Podcasts"
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="container" style={{ padding: "40px 0" }}>
        <article className="story-article">
          <header className="story-header">
            <h1>{podcast.title}</h1>
            <div className="story-meta">
              <span>By {podcast.author?.name}</span>
              <span> • </span>
              <span>{timeAgo(podcast.publishedAt)}</span>
              {podcast.duration && (
                <>
                  <span> • </span>
                  <span>{podcast.duration}</span>
                </>
              )}
              {category && (
                <>
                  <span> • </span>
                  <Link href={`/${category.slug}`}>
                    {category.title}
                  </Link>
                </>
              )}
            </div>
          </header>

          <div className="podcast-player-container">
            <div className="podcast-player">
              {podcast.thumbnail && (
                <Image
                  src={urlFor(podcast.thumbnail).width(200).height(200).url()}
                  alt={podcast.title}
                  width={200}
                  height={200}
                  style={{ borderRadius: "8px" }}
                />
              )}
              <audio
                controls
                style={{ width: "100%" }}
                src={podcast.audioUrl}
              >
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>

          {podcast.description && (
            <div className="story-description">
              <p>{podcast.description}</p>
            </div>
          )}

          {podcast.tags && podcast.tags.length > 0 && (
            <div className="story-tags">
              <h4>Tags:</h4>
              <div className="tag-list">
                {podcast.tags.map((tag: any) => (
                  <Link
                    key={tag.slug}
                    href={`/tag/${tag.slug}`}
                    className="tag"
                  >
                    {tag.title}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </article>
      </main>
    </>
  )
}
