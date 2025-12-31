"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

interface HeroPhotoProps {
  title: string
  mainImage: any
  photographer?: string
  publishedAt?: string
  categories?: { title: string; slug: string }[]
  slug?: string
}

export default function HeroPhoto({
  title,
  mainImage,
  photographer,
  publishedAt,
  categories,
  slug,
}: HeroPhotoProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)

  return (
    <>
      <section className="photo-hero-section">
        <div className="photo-hero-container">
          {/* Breadcrumb */}
          <div className="photo-hero-breadcrumb">
            <Link href="/photos" className="photo-breadcrumb-link">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
              Photos
            </Link>
          </div>

          {/* Hero Image */}
          <div className="photo-hero-image-wrapper">
            {mainImage && (
              <Image
                src={urlFor(mainImage).width(1920).height(1080).url()}
                alt={title}
                fill
                priority
                className="photo-hero-image"
              />
            )}
            <div className="photo-hero-overlay" />
          </div>

          {/* Content */}
          <div className="photo-hero-content">
            {/* Category Badge */}
            {categories && categories.length > 0 && (
              <div className="photo-hero-badges">
                <span className="photo-category-tag">{categories[0].title}</span>
              </div>
            )}

            {/* Title */}
            {slug ? (
              <Link href={`/photos/${slug}`}>
                <h1 className="photo-hero-title">{title}</h1>
              </Link>
            ) : (
              <h1 className="photo-hero-title">{title}</h1>
            )}

            {/* Meta */}
            <div className="photo-hero-meta">
              {photographer && <span className="photo-meta-photographer">{photographer}</span>}
              {publishedAt && <span className="photo-meta-date">{publishedAt}</span>}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && mainImage && (
        <div className="photo-fullscreen-modal" onClick={() => setIsFullscreen(false)}>
          <button className="photo-fullscreen-close" onClick={() => setIsFullscreen(false)}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={urlFor(mainImage).width(1920).height(1080).url()}
            alt={title}
            fill
            className="photo-fullscreen-image"
            priority
          />
        </div>
      )}
    </>
  )
}
