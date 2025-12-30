"use client"

import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"

interface PhotoCardProps {
  title: string
  image: any
  photographer?: string
  slug: string
  publishedAt?: string
}

function PhotoCard({ title, image, photographer, slug, publishedAt }: PhotoCardProps) {
  return (
    <Link href={`/photos/${slug}`} className="recommended-photo-card">
      <div className="recommended-photo-thumb">
        {image ? (
          <Image
            src={urlFor(image).width(300).height(200).url()}
            alt={title}
            fill
            sizes="100px"
            style={{ objectFit: "cover" }}
            loading="lazy"
          />
        ) : (
          <div className="recommended-photo-placeholder" />
        )}
        <div className="recommended-photo-overlay" />
        <div className="recommended-photo-play">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        </div>
      </div>
      <div className="recommended-photo-info">
        <h4 className="recommended-photo-title">{title}</h4>
        {photographer && (
          <span className="recommended-photo-author">{photographer}</span>
        )}
      </div>
    </Link>
  )
}

interface RecommendedPhotosProps {
  photos: Array<{
    title: string
    mainImage: any
    slug: string
    author?: { name: string }
    publishedAt?: string
  }>
}

export default function RecommendedPhotos({ photos }: RecommendedPhotosProps) {
  if (!photos || photos.length === 0) return null

  return (
    <aside className="recommended-photos-widget">
      {/* Back to Photos link */}
      <Link href="/photos" className="recommended-back-link">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M19 12H5M12 19l-7-7 7-7" />
        </svg>
        Back to Photos
      </Link>

      <h3 className="recommended-title">More Photo Stories</h3>
      <div className="recommended-photos-list">
        {photos.map((photo) => (
          <PhotoCard
            key={photo.slug}
            title={photo.title}
            image={photo.mainImage}
            photographer={photo.author?.name}
            slug={photo.slug}
            publishedAt={photo.publishedAt}
          />
        ))}
      </div>
      <Link href="/photos" className="recommended-more-link">
        View All Photos
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M5 12h14M12 5l7 7-7 7" />
        </svg>
      </Link>
    </aside>
  )
}
