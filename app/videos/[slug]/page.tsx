/**
 * ============================================
 * CINEMATIC VIDEO STORY PAGE
 * ============================================
 *
 * Layout Structure:
 * 1. HERO VIDEO PLAYER - Full-width 16:9 with breadcrumbs and actions
 * 2. MAIN CONTENT (2 columns) - Video info + Related videos sidebar
 *
 * Design Features:
 * - Dark navy theme matching video list page
 * - Orange accent color for emphasis
 * - Full dark theme sync for header/footer
 *
 * ============================================
 */

import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getVideoStoryBySlug } from "@/sanity/lib/getVideoStoryBySlug"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import { client } from "@/sanity/lib/sanity"
import "@/app/styles/cinematic-videos.css"

// Helper function to convert YouTube URLs to embed URLs
function getEmbedUrl(url: string): string {
  if (!url) return ''

  // YouTube Shorts: https://www.youtube.com/shorts/VIDEO_ID
  if (url.includes('/shorts/')) {
    const videoId = url.split('/shorts/')[1]?.split('?')[0]
    return `https://www.youtube.com/embed/${videoId}`
  }

  // YouTube regular: https://www.youtube.com/watch?v=VIDEO_ID or youtu.be
  if (url.includes('youtube.com') || url.includes('youtu.be')) {
    let videoId = ''

    if (url.includes('v=')) {
      videoId = url.split('v=')[1]?.split('&')[0]
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0]
    }

    if (videoId) {
      return `https://www.youtube.com/embed/${videoId}`
    }
  }

  // Vimeo
  if (url.includes('vimeo.com')) {
    const videoId = url.split('vimeo.com/')[1]?.split('?')[0]
    if (videoId) {
      return `https://player.vimeo.com/video/${videoId}`
    }
  }

  return url
}

export default async function VideoStoryPage({ params }: any) {
  const p = await params
  const slug = p.slug

  const videoStory = await getVideoStoryBySlug(slug)

  if (!videoStory) {
    notFound()
  }

  const isYouTube = videoStory.videoUrl?.includes("youtube.com") || videoStory.videoUrl?.includes("youtu.be")
  const isVimeo = videoStory.videoUrl?.includes("vimeo.com")
  const embedUrl = isYouTube || isVimeo ? getEmbedUrl(videoStory.videoUrl) : ''

  // Get related videos (same tags or same author)
  const relatedVideos = await client.fetch(`
    *[_type == "videoStory" && slug.current != $slug] | order(publishedAt desc)[0...6] {
      title,
      "slug": slug.current,
      isShort,
      thumbnail,
      publishedAt,
      author->{ name }
    }
  `, { slug })

  return (
    <main className="cinematic-videos-page video-theme">
      <div className="cinematic-videos-container">
        {/* ============================================
            BREADCRUMB & ACTIONS
            ============================================ */}
        <div className="video-breadcrumb">
          <Link href="/videos" className="breadcrumb-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Videos
          </Link>
          <span className="breadcrumb-separator">/</span>
          <span className="breadcrumb-current">{videoStory.title?.slice(0, 30)}...</span>
        </div>

        {/* ============================================
            HERO VIDEO PLAYER SECTION
            ============================================ */}
        <section className="video-player-section">
          {/* Full-width Video Player */}
          <div className="video-player-wrapper">
            {isYouTube || isVimeo ? (
              <iframe
                src={embedUrl}
                width="100%"
                height="100%"
                style={{ border: "none", borderRadius: "12px" }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <video
                controls
                style={{ width: "100%", borderRadius: "12px" }}
                poster={videoStory.thumbnail ? urlFor(videoStory.thumbnail).width(1920).height(1080).url() : undefined}
              >
                <source src={videoStory.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>

          {/* Video Info & Actions */}
          <div className="video-player-info">
            {/* Category Tag */}
            {videoStory.categories && videoStory.categories.length > 0 && (
              <Link
                href={`/${videoStory.categories[0].slug}`}
                className="video-category-tag"
              >
                {videoStory.categories[0].title}
              </Link>
            )}

            {/* Title */}
            <h1 className="video-player-title">{videoStory.title}</h1>

            {/* Meta Row */}
            <div className="video-player-meta">
              <span className="video-author">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
                {videoStory.author?.name}
              </span>
              <span className="video-separator">•</span>
              <span className="video-date">{timeAgo(videoStory.publishedAt)}</span>
              {videoStory.isShort && (
                <>
                  <span className="video-separator">•</span>
                  <span className="video-badge-short">Short</span>
                </>
              )}
            </div>

            {/* Action Buttons */}
            <div className="video-player-actions">
              <button className="video-action-btn like-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
                </svg>
                <span>Like</span>
              </button>
              <button className="video-action-btn like-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h2.67A2.31 2.31 0 0 1 22 4v7a2.31 2.31 0 0 1-2.33 2H17" />
                </svg>
                <span>Dislike</span>
              </button>
              <button className="video-action-btn share-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="18" cy="5" r="3" />
                  <circle cx="6" cy="12" r="3" />
                  <circle cx="18" cy="19" r="3" />
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                </svg>
                <span>Share</span>
              </button>
              <button className="video-action-btn save-btn">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
                <span>Save</span>
              </button>
            </div>

            {/* Description */}
            {videoStory.description && (
              <div className="video-description">
                <h3>About this video</h3>
                <p>{videoStory.description}</p>
              </div>
            )}
          </div>
        </section>

        {/* ============================================
            2-COLUMN LAYOUT (Desktop)
            ============================================ */}
        <div className="video-detail-grid">
          {/* Left Column: Tags */}
          <div className="video-detail-main">
            {videoStory.tags && videoStory.tags.length > 0 && (
              <div className="video-tags-section">
                <h3 className="video-tags-title">Tags</h3>
                <div className="video-tags-list">
                  {videoStory.tags.map((tag: any) => (
                    <Link
                      key={tag.slug}
                      href={`/tag/${tag.slug}`}
                      className="video-tag-link"
                    >
                      {tag.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Related Videos Sidebar */}
          <aside className="video-detail-sidebar">
            <h3 className="video-sidebar-title">More Videos</h3>
            <div className="video-sidebar-list">
              {relatedVideos.map((video: any) => (
                <Link
                  key={video.slug}
                  href={`/videos/${video.slug}`}
                  className="video-sidebar-card"
                >
                  <div className="video-sidebar-thumb">
                    {video.thumbnail && (
                      <Image
                        src={urlFor(video.thumbnail).width(200).height(112).url()}
                        alt={video.title}
                        width={100}
                        height={56}
                      />
                    )}
                    <div className="video-sidebar-play">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                    {video.isShort && (
                      <span className="video-sidebar-badge">Short</span>
                    )}
                  </div>
                  <div className="video-sidebar-info">
                    <h4 className="video-sidebar-title-text">{video.title}</h4>
                    <span className="video-sidebar-meta">
                      {video.author?.name} • {timeAgo(video.publishedAt)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
