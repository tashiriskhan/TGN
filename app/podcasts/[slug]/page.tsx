import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getPodcastBySlug } from "@/sanity/lib/getPodcastBySlug"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function PodcastPage({ params }: any) {
  const p = await params
  const slug = p.slug

  const podcast = await getPodcastBySlug(slug)

  if (!podcast) {
    notFound()
  }

  return (
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
            {podcast.category && (
              <>
                <span> • </span>
                <Link href={`/${podcast.category.slug}`}>
                  {podcast.category.title}
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
  )
}
