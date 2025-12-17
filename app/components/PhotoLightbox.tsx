"use client";

import { useState } from 'react';
import Image from 'next/image';

interface PhotoLightboxProps {
  images: any[];
  title: string;
}

export default function PhotoLightbox({ images, title }: PhotoLightboxProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const openLightbox = (index: number) => {
    setCurrentIndex(index);
    setIsOpen(true);
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
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

  return (
    <>
      {/* Gallery Grid */}
      <div className="photo-gallery-masonry">
        {images.map((image: any, index: number) => (
          <div
            key={index}
            className="photo-item"
            onClick={() => openLightbox(index)}
            style={{ cursor: 'pointer' }}
          >
            <Image
              src={image.url || image}
              alt={`${title} - Photo ${index + 1}`}
              width={800}
              height={600}
              style={{ width: "100%", height: "auto" }}
            />
          </div>
        ))}
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
