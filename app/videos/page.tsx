/**
 * ============================================
 * CINEMATIC VIDEO STORIES PAGE - REFINED
 * ============================================
 *
 * Layout Structure:
 * 1. HERO SECTION - Full-bleed with bottom gradient, tighter content
 *    - Max-width 700px for title, improved contrast overlay
 *    - Solid "Play Now" button with glow, ghost "Add to List" button
 * 2. MAIN GRID (2 columns) - All Videos grid + Up Next sidebar
 *    - 3 columns desktop, 2 tablet, 1 mobile
 *    - Sticky sidebar aligned with hero
 * 3. SHORTS CAROUSEL - Horizontal snap-scroll with edge fades
 *    - 4 cards desktop, 2 tablet, 1 mobile
 *    - Navigation arrows and gradient fades
 *
 * Key Custom Properties (in cinematic-videos.css):
 * --hero-height: 55vh (desktop hero height)
 * --section-padding: 48px (vertical rhythm between sections)
 * --grid-gap: 16px (spacing between grid items)
 * --color-bg: #0b1221 (desaturated navy)
 * --color-accent: #f97316 (brighter orange for emphasis)
 *
 * ============================================
 */

// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import "@/app/styles/cinematic-videos.css"

export default async function VideosPage() {
  const videoStories = await client.fetch(`
    *[_type == "videoStory"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      description,
      videoUrl,
      videoType,
      isShort,
      thumbnail,
      publishedAt,

      author->{ name, "slug": slug.current, image },
      categories[]->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `)

  // Separate short videos and regular videos
  const shortVideos = videoStories.filter((v: any) => v.isShort)
  const regularVideos = videoStories.filter((v: any) => !v.isShort)
  const heroVideo = regularVideos[0] || shortVideos[0]
  const gridVideos = regularVideos.slice(0, 9)
  const sidebarVideos = regularVideos.slice(1, 4)

  return (
    <main className="cinematic-videos-page video-theme">
      <div className="cinematic-videos-container">
        {/* ============================================
            HERO SECTION
            ============================================ */}
        {heroVideo && (
          <section className="cinematic-hero">
            <div className="cinematic-hero-bg">
              {heroVideo.thumbnail ? (
                <Image
                  src={urlFor(heroVideo.thumbnail).width(1920).height(1080).url()}
                  alt={heroVideo.title}
                  fill
                  priority
                />
              ) : (
                <div className="skeleton" style={{ width: '100%', height: '100%' }} />
              )}
            </div>
            <div className="cinematic-hero-overlay" />
            <div className="cinematic-hero-content">
              {/* Badges */}
              <div className="cinematic-hero-badges">
                {heroVideo.categories && heroVideo.categories.length > 0 && (
                  <span className="cinematic-badge category">
                    {heroVideo.categories[0].title}
                  </span>
                )}
                <span className="cinematic-badge featured">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  Featured
                </span>
                {heroVideo.isShort && (
                  <span className="cinematic-badge trending">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    Trending
                  </span>
                )}
              </div>

              {/* Title - Max width 700px */}
              <Link href={`/videos/${heroVideo.slug}`}>
                <h1 className="cinematic-hero-title">{heroVideo.title}</h1>
              </Link>

              {/* Meta - Smaller, closer to title */}
              <div className="cinematic-hero-meta">
                <span>{heroVideo.author?.name}</span>
                <span>•</span>
                <span>{timeAgo(heroVideo.publishedAt)}</span>
              </div>

              {/* Action Buttons */}
              <div className="cinematic-hero-actions">
                <Link href={`/videos/${heroVideo.slug}`} className="cinematic-btn cinematic-btn-play">
                  <svg viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  Play Now
                </Link>
                <button className="cinematic-btn cinematic-btn-glass">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                  </svg>
                  Add to List
                </button>
              </div>
            </div>
          </section>
        )}

        {/* ============================================
            MAIN GRID: All Videos + Up Next Sidebar
            ============================================ */}
        <div className="cinematic-main-grid">
          {/* Left Column: All Videos Grid */}
          <div>
            {/* Section Heading */}
            <div className="section-heading">
              <h2>All Videos</h2>
              <span style={{ marginLeft: 'auto', fontSize: 'var(--text-xs)', color: 'var(--color-text-muted)' }}>
                {gridVideos.length} videos
              </span>
            </div>

            {/* Video Grid - 3 columns desktop, 2 tablet, 1 mobile */}
            <div className="cinematic-videos-grid">
              {gridVideos.map((video: any) => (
                <Link
                  key={video.slug}
                  href={`/videos/${video.slug}`}
                  className="cinematic-video-card"
                >
                  <div className="cinematic-card-thumb">
                    {video.thumbnail ? (
                      <Image
                        src={urlFor(video.thumbnail).width(400).height(225).url()}
                        alt={video.title}
                        fill
                      />
                    ) : (
                      <div className="skeleton" style={{ width: '100%', height: '100%' }} />
                    )}
                    <div className="cinematic-card-overlay" />

                    {/* Circular Play Icon - Shows on hover */}
                    <div className="cinematic-card-play">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>

                    {/* Duration Pill - Bottom Right */}
                    <span className="cinematic-card-duration">0:30</span>

                    {/* Short Badge - Top Left */}
                    {video.isShort && (
                      <span className="cinematic-card-badge-short">Short</span>
                    )}
                  </div>
                  <div className="cinematic-card-content">
                    <h3 className="cinematic-card-title">{video.title}</h3>
                    <div className="cinematic-card-meta">
                      <span>{video.author?.name}</span>
                      <span>•</span>
                      <span>{timeAgo(video.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column: Up Next Sidebar */}
          <aside className="cinematic-sidebar">
            <div className="cinematic-sidebar-header">
              <h3>Up Next</h3>
              <span className="cinematic-sidebar-count">{sidebarVideos.length}</span>
            </div>
            <div className="cinematic-sidebar-list">
              {sidebarVideos.map((video: any) => (
                <Link
                  key={video.slug}
                  href={`/videos/${video.slug}`}
                  className="cinematic-sidebar-card"
                >
                  <div className="cinematic-sidebar-thumb">
                    {video.thumbnail ? (
                      <Image
                        src={urlFor(video.thumbnail).width(200).height(112).url()}
                        alt={video.title}
                        width={100}
                        height={56}
                      />
                    ) : (
                      <div className="skeleton" style={{ width: '100%', height: '100%' }} />
                    )}
                    <div className="cinematic-sidebar-play">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                    </div>
                  </div>
                  <div className="cinematic-sidebar-info">
                    <h4 className="cinematic-sidebar-title">{video.title}</h4>
                    <div className="cinematic-sidebar-meta">
                      <span>{video.author?.name}</span>
                      <span>•</span>
                      <span>{timeAgo(video.publishedAt)}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </aside>
        </div>

        {/* ============================================
            SHORTS CAROUSEL
            ============================================ */}
        {shortVideos.length > 0 && (
          <section className="cinematic-shorts-section">
            <div className="cinematic-shorts-header">
              <h2>
                Short Videos
                <span className="cinematic-badge trending" style={{ marginLeft: '0.5rem' }}>
                  Hot
                </span>
              </h2>
              <span className="cinematic-shorts-count">{shortVideos.length} shorts</span>
            </div>

            <div className="cinematic-shorts-wrapper">
              {/* Gradient Fades */}
              <div className="cinematic-shorts-gradient-left" />
              <div className="cinematic-shorts-gradient-right" />

              {/* Navigation Arrows */}
              <button className="cinematic-shorts-nav prev" aria-label="Previous">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button className="cinematic-shorts-nav next" aria-label="Next">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Horizontal Scroll Carousel */}
              <div className="cinematic-shorts-scroll">
                {shortVideos.map((video: any) => (
                  <Link
                    key={video.slug}
                    href={`/videos/${video.slug}`}
                    className="cinematic-short-card"
                  >
                    <div className="cinematic-short-thumb">
                      {video.thumbnail ? (
                        <Image
                          src={urlFor(video.thumbnail).width(160).height(284).url()}
                          alt={video.title}
                          fill
                        />
                      ) : (
                        <div className="skeleton" style={{ width: '100%', height: '100%' }} />
                      )}
                      <div className="cinematic-short-overlay" />
                      <span className="cinematic-short-badge">
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        Short
                      </span>
                      <div className="cinematic-short-info">
                        <h4 className="cinematic-short-title">{video.title}</h4>
                        <span className="cinematic-short-meta">
                          {video.author?.name} • {timeAgo(video.publishedAt)}
                        </span>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ============================================
            EMPTY STATE
            ============================================ */}
        {videoStories.length === 0 && (
          <div className="cinematic-empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
              <line x1="7" y1="2" x2="7" y2="22" />
              <line x1="17" y1="2" x2="17" y2="22" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            <h3>No videos yet</h3>
            <p>Check back soon for new content</p>
          </div>
        )}
      </div>
    </main>
  )
}
