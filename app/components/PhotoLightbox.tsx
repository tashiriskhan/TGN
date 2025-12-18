"use client";

import { useState, useRef } from 'react';
import Image from 'next/image';

interface PhotoLightboxProps {
  images: any[];
  title: string;
}

export default function PhotoLightbox({ images, title }: PhotoLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
  };

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowLeft') goToPrevious();
    if (e.key === 'ArrowRight') goToNext();
  };

  const goToCarouselSlide = (index: number) => {
    setCarouselIndex(index);
  };

  const nextCarouselSlide = () => {
    setCarouselIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  const prevCarouselSlide = () => {
    setCarouselIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  // Swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && carouselIndex < images.length - 1) {
      nextCarouselSlide();
    }
    if (isRightSwipe && carouselIndex > 0) {
      prevCarouselSlide();
    }
  };

  return (
    <>
      {/* Carousel Gallery */}
      <div className="photo-gallery-carousel">
        {/* Main Carousel */}
        <div
          className="carousel-container"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="carousel-wrapper">
            <div
              className="carousel-slide-container"
              style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
            >
              {images.map((image: any, index: number) => (
                <div
                  key={index}
                  className="carousel-slide"
                  onClick={() => openLightbox(index)}
                  style={{ cursor: 'pointer' }}
                >
                  <Image
                    src={image.url || image}
                    alt={`${title} - Photo ${index + 1}`}
                    width={1200}
                    height={700}
                    style={{ width: "100%", height: "auto", objectFit: "contain" }}
                    priority={index === 0}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Carousel Navigation */}
          {images.length > 1 && (
            <>
              <button
                className="carousel-nav carousel-prev"
                onClick={prevCarouselSlide}
                aria-label="Previous image"
              >
                ‹
              </button>
              <button
                className="carousel-nav carousel-next"
                onClick={nextCarouselSlide}
                aria-label="Next image"
              >
                ›
              </button>
            </>
          )}

          {/* Carousel Dots Indicator */}
          {images.length > 1 && (
            <div className="carousel-dots">
              {images.map((_: any, index: number) => (
                <button
                  key={index}
                  className={`carousel-dot ${carouselIndex === index ? 'active' : ''}`}
                  onClick={() => goToCarouselSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Swipe Hint for Mobile */}
          {images.length > 1 && (
            <div className="carousel-swipe-hint">
              <span>⟵ Swipe ⟶</span>
            </div>
          )}
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="carousel-thumbnails">
            {images.map((image: any, index: number) => (
              <div
                key={index}
                className={`carousel-thumbnail ${carouselIndex === index ? 'active' : ''}`}
                onClick={() => goToCarouselSlide(index)}
              >
                <Image
                  src={image.url || image}
                  alt={`${title} - Thumbnail ${index + 1}`}
                  width={120}
                  height={80}
                  style={{ width: "100%", height: "auto", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {isOpen && (
        <div
          className="photo-lightbox-overlay"
          onClick={closeLightbox}
          onKeyDown={handleKeyDown}
          tabIndex={0}
        >
          <div className="photo-lightbox-container">
            {/* Close Button */}
            <button
              className="photo-lightbox-close"
              onClick={closeLightbox}
              aria-label="Close lightbox"
            >
              ×
            </button>

            {/* Previous Button */}
            {images.length > 1 && (
              <button
                className="photo-lightbox-nav photo-lightbox-prev"
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                aria-label="Previous image"
              >
                ‹
              </button>
            )}

            {/* Main Image */}
            <div className="photo-lightbox-image-container" onClick={(e) => e.stopPropagation()}>
              <Image
                src={images[currentIndex].url || images[currentIndex]}
                alt={`${title} - Photo ${currentIndex + 1}`}
                width={1200}
                height={900}
                style={{ width: "100%", height: "auto" }}
                priority
              />

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="photo-lightbox-counter">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </div>

            {/* Next Button */}
            {images.length > 1 && (
              <button
                className="photo-lightbox-nav photo-lightbox-next"
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                aria-label="Next image"
              >
                ›
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
}
