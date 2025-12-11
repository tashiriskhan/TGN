import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getVideoStoryBySlug } from "@/sanity/lib/getVideoStoryBySlug"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function VideoStoryPage({ params }: any) {
  const p = await params
  const slug = p.slug

  const videoStory = await getVideoStoryBySlug(slug)

  if (!videoStory) {
    notFound()
  }

  const isYouTube = videoStory.videoUrl?.includes("youtube.com") || videoStory.videoUrl?.includes("youtu.be")
  const isVimeo = videoStory.videoUrl?.includes("vimeo.com")

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <article className="story-article">
        <header className="story-header">
          <h1>{videoStory.title}</h1>
          <div className="story-meta">
            <span>By {videoStory.author?.name}</span>
            <span> • </span>
            <span>{timeAgo(videoStory.publishedAt)}</span>
            {videoStory.category && (
              <>
                <span> • </span>
                <Link href={`/${videoStory.category.slug}`}>
                  {videoStory.category.title}
                </Link>
              </>
            )}
          </div>
        </header>

        <div className="video-container">
          {isYouTube || isVimeo ? (
            <iframe
              src={videoStory.videoUrl}
              width="100%"
              height="500"
              style={{ border: "none", borderRadius: "8px" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <video
              controls
              style={{ width: "100%", borderRadius: "8px" }}
              poster={videoStory.thumbnail ? urlFor(videoStory.thumbnail).width(1200).height(675).url() : undefined}
            >
              <source src={videoStory.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )}
        </div>

        {videoStory.description && (
          <div className="story-description">
            <p>{videoStory.description}</p>
          </div>
        )}

        {videoStory.tags && videoStory.tags.length > 0 && (
          <div className="story-tags">
            <h4>Tags:</h4>
            <div className="tag-list">
              {videoStory.tags.map((tag: any) => (
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
