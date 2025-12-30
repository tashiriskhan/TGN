"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { timeouts } from "@/config/site"

interface HeroPhotoProps {
  title: string
  mainImage: any
  photographer?: string
  location?: string
  publishedAt?: string
}

export default function HeroPhoto({
  title,
  mainImage,
  photographer,
  location,
  publishedAt,
}: HeroPhotoProps) {
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [copied, setCopied] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // Parallax effect on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        if (rect.top <= window.innerHeight && rect.bottom >= 0) {
          setScrollY(window.scrollY)
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      await navigator.share({
        title: title,
        url: window.location.href
      })
    } else {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), timeouts.copyFeedback)
    }
  }

  // Calculate parallax offset (subtle effect)
  const parallaxOffset = scrollY * 0.3

  return (
    <>
      <section className="photo-hero-section" ref={sectionRef}>
        <div className="photo-hero-container">
          {/* Full-width Hero Image with Parallax */}
          <div className="photo-hero-image-wrapper">
            {mainImage && (
              <Image
                src={urlFor(mainImage).width(1920).height(1080).url()}
                alt={title}
                fill
                priority
                className="photo-hero-image"
                style={{ transform: `translateY(${parallaxOffset}px) scale(1.1)` }}
              />
            )}
            <div className="photo-hero-overlay" />

            {/* Action Buttons */}
            <div className="photo-hero-actions">
              <button
                className="photo-action-btn"
                onClick={handleShare}
                title="Share"
              >
                {copied ? (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <path d="M8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98" />
                  </svg>
                )}
              </button>
              <button
                className="photo-action-btn"
                title="Save"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                </svg>
              </button>
              <button
                className="photo-action-btn"
                onClick={() => setIsFullscreen(true)}
                title="Fullscreen"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Centered Content */}
          <div className="photo-hero-content">
            <h1 className="photo-hero-title">{title}</h1>

            {/* Meta row: Photographer • Location • Date */}
            <div className="photo-hero-meta-row">
              {photographer && (
                <span className="photo-meta-photographer">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  {photographer}
                </span>
              )}
              {location && (
                <span className="photo-meta-location">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                  {location}
                </span>
              )}
              {publishedAt && (
                <span className="photo-meta-date">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                  </svg>
                  {publishedAt}
                </span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Modal */}
      {isFullscreen && (
        <div className="photo-fullscreen-modal" onClick={() => setIsFullscreen(false)}>
          <button
            className="photo-fullscreen-close"
            onClick={() => setIsFullscreen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          {mainImage && (
            <Image
              src={urlFor(mainImage).width(1920).height(1080).url()}
              alt={title}
              fill
              className="photo-fullscreen-image"
              priority
            />
          )}
        </div>
      )}
    </>
  )
}
