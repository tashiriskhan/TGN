"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"

interface GalleryImage {
  _key: string
  asset: any
  caption?: string
  alt?: string
}

interface PhotoGalleryProps {
  images: GalleryImage[]
  title?: string
}

export default function PhotoGallery({ images, title }: PhotoGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLightboxOpen, setIsLightboxOpen] = useState(false)
  const [isTouching, setIsTouching] = useState(false)
  const [touchStart, setTouchStart] = useState(0)
  const touchThreshold = 50
  const carouselRef = useRef<HTMLDivElement>(null)

  const nextImage = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }, [images.length])

  const prevImage = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }, [images.length])

  // Touch/swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsTouching(true)
    setTouchStart(e.touches[0].clientX)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isTouching) return
    const touchEnd = e.touches[0].clientX
    const diff = touchStart - touchEnd

    if (Math.abs(diff) > touchThreshold) {
      if (diff > 0) {
        nextImage()
      } else {
        prevImage()
      }
      setIsTouching(false)
    }
  }

  const handleTouchEnd = () => {
    setIsTouching(false)
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isLightboxOpen) return
      if (e.key === "ArrowRight") nextImage()
      if (e.key === "ArrowLeft") prevImage()
      if (e.key === "Escape") setIsLightboxOpen(false)
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [isLightboxOpen, nextImage, prevImage])

  if (!images || images.length === 0) return null

  // Single image - click opens fullscreen
  if (images.length === 1) {
    return (
      <section className="photo-gallery-section">
        <div
          className="photo-single-image"
          onClick={() => setIsLightboxOpen(true)}
        >
          <Image
            src={urlFor(images[0].asset).width(1600).height(1200).url()}
            alt={images[0].alt || title || "Photo"}
            width={1600}
            height={1200}
            className="photo-gallery-main"
            priority
          />
          {images[0].caption && (
            <p className="photo-gallery-caption">{images[0].caption}</p>
          )}
        </div>

        {/* Lightbox for single image */}
        {isLightboxOpen && (
          <div className="photo-lightbox" onClick={() => setIsLightboxOpen(false)}>
            <button
              className="photo-lightbox-close"
              onClick={() => setIsLightboxOpen(false)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>
            <Image
              src={urlFor(images[0].asset).width(1920).height(1440).url()}
              alt={images[0].alt || "Photo"}
              fill
              className="photo-lightbox-image"
              priority
            />
          </div>
        )}
      </section>
    )
  }

  // Progress indicator dots
  const renderProgressDots = () => {
    return (
      <div className="photo-gallery-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`photo-gallery-dot ${index === currentIndex ? "active" : ""}`}
            onClick={() => setCurrentIndex(index)}
            aria-label={`Go to image ${index + 1}`}
          />
        ))}
      </div>
    )
  }

  // Multiple images - carousel (click opens fullscreen)
  return (
    <>
      <section className="photo-gallery-section">
        {title && <h2 className="photo-gallery-title">Gallery</h2>}

        {/* Main Carousel with swipe - click opens fullscreen */}
        <div
          className="photo-carousel"
          ref={carouselRef}
          onClick={() => setIsLightboxOpen(true)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="photo-carousel-container">
            <Image
              src={urlFor(images[currentIndex].asset).width(1600).height(1200).url()}
              alt={images[currentIndex].alt || `Photo ${currentIndex + 1}`}
              width={1600}
              height={1200}
              className="photo-carousel-image"
              priority={currentIndex === 0}
            />

            {/* Navigation Arrows */}
            <button
              className="photo-carousel-btn photo-carousel-prev"
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button
              className="photo-carousel-btn photo-carousel-next"
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            {/* Image Counter */}
            <div className="photo-carousel-counter">
              <span className="photo-counter-current">{currentIndex + 1}</span>
              <span className="photo-counter-separator">/</span>
              <span className="photo-counter-total">{images.length}</span>
            </div>

            {/* Fullscreen indicator */}
            <div className="photo-fullscreen-indicator">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </div>
          </div>

          {/* Caption */}
          {images[currentIndex].caption && (
            <p className="photo-carousel-caption">
              <span className="photo-caption-text">{images[currentIndex].caption}</span>
            </p>
          )}

          {/* Progress Dots */}
          {renderProgressDots()}
        </div>

        {/* Thumbnails with glow hover */}
        <div className="photo-thumbnails">
          {images.map((image, index) => (
            <button
              key={image._key}
              className={`photo-thumbnail ${index === currentIndex ? "active" : ""}`}
              onClick={(e) => { e.stopPropagation(); setCurrentIndex(index) }}
              aria-label={`Go to image ${index + 1}`}
            >
              <Image
                src={urlFor(image.asset).width(200).height(150).url()}
                alt={`Thumbnail ${index + 1}`}
                width={200}
                height={150}
                loading="lazy"
              />
              <div className="photo-thumbnail-overlay" />
            </button>
          ))}
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div className="photo-lightbox" onClick={() => setIsLightboxOpen(false)}>
          <button
            className="photo-lightbox-close"
            onClick={() => setIsLightboxOpen(false)}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={urlFor(images[currentIndex].asset).width(1920).height(1440).url()}
            alt={images[currentIndex].alt || `Photo ${currentIndex + 1}`}
            fill
            className="photo-lightbox-image"
            priority
          />
          <div className="photo-lightbox-nav">
            <button onClick={(e) => { e.stopPropagation(); prevImage() }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <span>{currentIndex + 1} / {images.length}</span>
            <button onClick={(e) => { e.stopPropagation(); nextImage() }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
          {/* Caption in lightbox */}
          {images[currentIndex].caption && (
            <div className="photo-lightbox-caption">
              {images[currentIndex].caption}
            </div>
          )}
        </div>
      )}
    </>
  )
}
