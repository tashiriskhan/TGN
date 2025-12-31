/**
 * ============================================
 * DARK PHOTO STORIES PAGE
 * ============================================
 *
 * Layout Structure:
 * 1. HERO SECTION - Full-width with dark gradient overlay
 * 2. FILTER SECTION - Category chips + photo count
 * 3. MASONRY GRID - 4 columns desktop, 2 tablet, 1 mobile
 * 4. NEWSLETTER CARD - Email signup
 *
 * Design Features:
 * - Dark navy theme matching video pages
 * - Orange accent color for emphasis
 * - Premium photojournalism showcase
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
import "@/app/styles/dark-photos.css"
import PhotoHeroCTA from "./PhotoHeroCTA"

const PAGE_SIZE = 12

export default async function PhotosPage({ searchParams }: any) {
  const s = await searchParams
  const page = Number(s.page) || 1
  const category = s.category || 'all'
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  // Fetch all photo categories from Sanity for dynamic filters
  const allCategories = await client.fetch(`
    *[_type == "photoCategory"] | order(title asc) {
      title,
      "slug": slug.current
    }
  `)

  // Build filter list: All + categories from Sanity
  const filters = [
    { id: 'all', label: 'All' },
    ...allCategories.map((cat: any) => ({
      id: cat.slug,
      label: cat.title
    }))
  ]

  // Build query based on category filter
  let query = `*[_type == "photoStory"]`
  if (category !== 'all') {
    query = `*[_type == "photoStory" && "${category}" in categories[]->slug.current]`
  }

  const photoStories = await client.fetch(
    `${query} | order(publishedAt desc)[${start}...${end}] {
      title,
      description,
      mainImage,
      gallery,
      publishedAt,
      "slug": slug.current,
      "categories": categories[]->{ title, "slug": slug.current },
      author->{ name }
    }`
  )

  // Fetch the latest photo story for hero background
  const latestStory = await client.fetch(`
    *[_type == "photoStory"] | order(publishedAt desc)[0] {
      mainImage,
      title,
      publishedAt
    }
  `)

  const totalStories = await client.fetch(
    category !== 'all'
      ? `count(*[_type == "photoStory" && "${category}" in categories[]->slug.current])`
      : `count(*[_type == "photoStory"])`
  )

  const totalPages = Math.ceil(totalStories / PAGE_SIZE)

  return (
    <main className="photo-stories-page">
      <div className="photo-stories-container">
        {/* ============================================
            HERO SECTION
            ============================================ */}
        <section className="photo-hero">
          <div className="photo-hero-bg">
            {latestStory?.mainImage ? (
              <Image
                src={urlFor(latestStory.mainImage).width(1920).height(1080).url()}
                alt={latestStory.title}
                fill
                style={{ objectFit: 'cover' }}
                priority
              />
            ) : (
              <div style={{
                width: '100%',
                height: '100%',
                background: 'linear-gradient(135deg, #1e293b 0%, #0f141a 100%)'
              }} />
            )}
          </div>
          <div className="photo-hero-overlay" />
          <div className="photo-hero-content">
            <span className="photo-hero-label">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="3" />
              </svg>
              Visual Journalism
            </span>
            <h1 className="photo-hero-title">Photo Stories</h1>
            <p className="photo-hero-subtitle">
              Visual narratives from journalists around the world
            </p>
            <PhotoHeroCTA />
          </div>
        </section>

        {/* ============================================
            FILTER SECTION
            ============================================ */}
        <section className="photo-filters-section">
          <div className="photo-filters-header">
            <h2 className="photo-filters-title">Latest Photography</h2>
            <div className="photo-meta-info">
              <span className="photo-count">{totalStories} photos</span>
              <span>Updated {timeAgo(new Date().toISOString())}</span>
            </div>
          </div>
          <div className="photo-filter-chips">
            {filters.map((filter: any) => (
              <Link
                key={filter.id}
                href={filter.id === 'all' ? '/photos' : `/photos?category=${filter.id}`}
                className={`photo-filter-chip ${category === filter.id ? 'active' : ''}`}
              >
                {filter.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ============================================
            MASONRY GRID
            ============================================ */}
        {photoStories.length > 0 ? (
          <div className="photo-masonry-grid" id="photo-gallery">
            {photoStories.map((story: any, index: number) => {
              // Create varied grid spans for masonry effect
              const isTall = index % 5 === 0 || index % 7 === 0
              const isWide = index % 3 === 0
              const cardClass = isTall ? 'photo-card photo-card-tall' : (isWide ? 'photo-card photo-card-wide' : 'photo-card')

              // Calculate image dimensions for URL
              const imgWidth = isTall ? 400 : (isWide ? 800 : 400)
              const imgHeight = isTall ? 500 : 300

              return (
                <Link
                  key={story.slug}
                  href={`/photos/${story.slug}`}
                  className={cardClass}
                >
                  <div className="photo-card-thumb">
                    {story.mainImage ? (
                      <Image
                        src={urlFor(story.mainImage).width(imgWidth).height(imgHeight).url()}
                        alt={story.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        style={{ objectFit: 'cover' }}
                      />
                    ) : (
                      <div style={{ width: '100%', height: '100%', background: 'var(--bg-tertiary)' }} />
                    )}
                    <div className="photo-card-overlay" />

                    {/* Badges */}
                    <div className="photo-card-badges">
                      {index < 3 && <span className="photo-card-badge new">New</span>}
                      <span className="photo-card-badge date">
                        {new Date(story.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Content Overlay */}
                  <div className="photo-card-content">
                    <h3 className="photo-card-title">{story.title}</h3>
                    <div className="photo-card-meta">
                      <span>{story.author?.name}</span>
                      <span>•</span>
                      <span>{timeAgo(story.publishedAt)}</span>
                    </div>
                    {story.categories && story.categories.length > 0 && (
                      <div className="photo-card-location">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {story.categories[0].title}
                      </div>
                    )}
                  </div>
                </Link>
              )
            })}
          </div>
        ) : (
          <div className="photo-empty-state">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <polyline points="21 15 16 10 5 21" />
            </svg>
            <h3>No photo stories yet</h3>
            <p>Check back soon for new visual narratives</p>
          </div>
        )}

        {/* ============================================
            LOAD MORE / PAGINATION
            ============================================ */}
        {totalPages > 1 && (
          <div className="photo-load-more">
            <Link href={`/photos?page=${page + 1}`} className="photo-load-more-btn">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="7 13 12 18 17 13" />
                <polyline points="7 6 12 11 17 6" />
              </svg>
              Load More Stories
            </Link>
          </div>
        )}

        {/* ============================================
            NEWSLETTER SECTION
            ============================================ */}
        <section className="photo-newsletter">
          <div className="photo-newsletter-card">
            <div className="photo-newsletter-content">
              <h3 className="photo-newsletter-title">Stay with our photo stories</h3>
              <p className="photo-newsletter-desc">
                Subscribe to receive photo stories and newsletters from journalists around the world.
              </p>
            </div>
            <form className="photo-newsletter-form" action="/api/newsletter" method="POST">
              <input
                type="email"
                name="email"
                placeholder="Enter your email address"
                className="photo-newsletter-input"
                required
              />
              <button type="submit" className="photo-newsletter-btn">
                Subscribe
              </button>
            </form>
          </div>
        </section>
      </div>
    </main>
  )
}
