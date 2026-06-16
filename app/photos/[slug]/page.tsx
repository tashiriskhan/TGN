/**
 * ============================================
 * PHOTO STORY SLUG PAGE
 * ============================================
 */

import { notFound } from "next/navigation"
import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import type { Metadata } from "next"
import HeroPhoto from "./HeroPhoto"
import PhotoGallery from "./PhotoGallery"
import RecommendedPhotos from "./RecommendedPhotos"
import PhotographerBio from "./PhotographerBio"
import NewsletterCard from "./NewsletterCard"
import "@/app/styles/dark-photo-story.css"

// Fetch single photo story by slug
async function getPhotoStory(slug: string) {
  try {
    return await client.fetch(
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
  } catch (err) {
    console.error(`Failed to fetch photo story for slug ${slug}:`, err)
    return null
  }
}

// Fetch recommended photos
async function getRecommendedPhotos(excludeSlug: string) {
  try {
    return await client.fetch(
      `*[_type == "photoStory" && slug.current != $slug] | order(publishedAt desc)[0...4] {
        title,
        mainImage,
        "slug": slug.current,
        author->{ name },
        publishedAt
      }`,
      { slug: excludeSlug }
    )
  } catch (err) {
    console.error("Failed to fetch recommended photos:", err)
    return []
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const photoStory = await getPhotoStory(slug)

  if (!photoStory) {
    return {
      title: "Photo Story Not Found",
    }
  }

  const description = photoStory.description 
    ? photoStory.description.slice(0, 155)
    : `View our latest visual journalism and photo essay: ${photoStory.title} on The Ground Narrative.`

  return {
    title: `${photoStory.title} | Photo Essay & Visual Storytelling`,
    description,
    alternates: {
      canonical: `https://www.groundnarrative.com/photos/${slug}`,
    },
    openGraph: {
      title: photoStory.title,
      description,
      type: "article",
      url: `https://www.groundnarrative.com/photos/${slug}`,
      images: photoStory.mainImage ? [
        {
          url: urlFor(photoStory.mainImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: photoStory.title,
        }
      ] : [],
    }
  }
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

  // Create JSON-LD structured data for photojournalism
  const siteUrl = "https://www.groundnarrative.com";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "headline": photoStory.title,
    "description": photoStory.description ? photoStory.description.slice(0, 150) : undefined,
    "image": photoStory.mainImage ? urlFor(photoStory.mainImage).width(1200).height(630).url() : undefined,
    "datePublished": photoStory.publishedAt,
    "dateModified": photoStory.publishedAt,
    "author": {
      "@type": "Person",
      "name": photoStory.author?.name || "The Ground Narrative Photographer",
    },
    "publisher": {
      "@type": "NewsMediaOrganization",
      "name": "The Ground Narrative",
      "logo": {
        "@type": "ImageObject",
        "url": `${siteUrl}/logo.svg`,
      },
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${siteUrl}/photos/${slug}`,
    }
  };

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      <div className="photo-story-page">
        {/* Hero Section */}
        <HeroPhoto
          title={photoStory.title}
          mainImage={photoStory.mainImage}
          photographer={photoStory.author?.name}
          publishedAt={formatDate(photoStory.publishedAt)}
          categories={photoStory.categories}
          slug={photoStory.slug}
        />

        {/* Main Content Grid - Generous spacing */}
        <div className="photo-story-container">
          {/* Main content area with proper spacing */}
          <div className="photo-story-main-content">
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
          </div>

          {/* Sidebar - Sticky with generous spacing */}
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

        {/* Newsletter Section */}
        <NewsletterCard
          heroImage={photoStory.mainImage ? urlFor(photoStory.mainImage).width(400).height(300).url() : null}
        />
      </div>
    </>
  )
}
