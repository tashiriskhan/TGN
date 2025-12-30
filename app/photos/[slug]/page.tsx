/**
 * ============================================
 * PHOTO STORY SLUG PAGE
 * ============================================
 *
 * Layout Structure:
 * 1. HERO SECTION - Full-width hero image with overlay
 * 2. MAIN CONTENT (Left 70%) - Gallery, article
 * 3. SIDEBAR (Right 30%) - Bio, recommended
 * 4. NEWSLETTER - Compact card at bottom
 *
 * Design Features:
 * - Dark navy theme (#0f141a)
 * - Orange accent (#f97316)
 * - Full dark theme sync for header/footer
 *
 * ============================================
 */

import { notFound } from "next/navigation"
import Image from "next/image"
import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import HeroPhoto from "./HeroPhoto"
import PhotoGallery from "./PhotoGallery"
import RecommendedPhotos from "./RecommendedPhotos"
import PhotographerBio from "./PhotographerBio"
import NewsletterCard from "./NewsletterCard"
import "@/app/styles/dark-photo-story.css"

// Fetch single photo story by slug
async function getPhotoStory(slug: string) {
  return client.fetch(
    `*[_type == "photoStory" && slug.current == $slug][0] {
      title,
      description,
      mainImage,
      gallery,
      publishedAt,
      "slug": slug.current,
      "categories": categories[]->{ title, "slug": slug.current },
      author->{
        name,
        bio,
        avatar,
        location,
        socialLinks
      },
      "tags": tags[]->{ title, "slug": slug.current },
      body
    }`,
    { slug }
  )
}

// Fetch recommended photos
async function getRecommendedPhotos(excludeSlug: string) {
  return client.fetch(
    `*[_type == "photoStory" && slug.current != $slug] | order(publishedAt desc)[0...4] {
      title,
      mainImage,
      "slug": slug.current,
      author->{ name },
      publishedAt
    }`,
    { slug: excludeSlug }
  )
}

export default async function PhotoStoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const photoStory = await getPhotoStory(slug)

  if (!photoStory) {
    notFound()
  }

  const recommendedPhotos = await getRecommendedPhotos(slug)

  // Format date for display
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    })
  }

  // Get location from author or categories
  const location = photoStory.author?.location ||
    (photoStory.categories?.[0]?.title ? `${photoStory.categories[0].title}` : "")

  return (
    <div className="photo-story-page">
      {/* Hero Section */}
      <HeroPhoto
        title={photoStory.title}
        mainImage={photoStory.mainImage}
        photographer={photoStory.author?.name}
        location={location}
        publishedAt={formatDate(photoStory.publishedAt)}
      />

      {/* Main Content Grid */}
      <div className="photo-story-container">
        <div className="photo-story-grid">
          {/* Left Column - Main Content */}
          <main className="photo-story-main">
            {/* Photo Gallery */}
            {photoStory.gallery && photoStory.gallery.length > 0 && (
              <PhotoGallery
                images={photoStory.gallery}
                title="Gallery"
              />
            )}

            {/* Article Body */}
            {photoStory.description && (
              <article className="photo-story-article">
                <div className="photo-story-description">
                  <p>{photoStory.description}</p>
                </div>

                {/* Rich text body would go here if available */}
                {photoStory.body && (
                  <div className="photo-story-body">
                    {/* Portable Text would be rendered here */}
                  </div>
                )}
              </article>
            )}
          </main>

          {/* Right Column - Sidebar */}
          <aside className="photo-story-sidebar">
            {/* Photographer Bio */}
            <PhotographerBio
              name={photoStory.author?.name || "Unknown Photographer"}
              avatar={photoStory.author?.avatar}
              bio={photoStory.author?.bio}
              location={photoStory.author?.location}
              socialLinks={photoStory.author?.socialLinks}
            />

            {/* Recommended Photos */}
            <RecommendedPhotos photos={recommendedPhotos} />
          </aside>
        </div>
      </div>

      {/* Newsletter Section */}
      <NewsletterCard
        heroImage={photoStory.mainImage ? urlFor(photoStory.mainImage).width(400).height(300).url() : null}
      />
    </div>
  )
}
