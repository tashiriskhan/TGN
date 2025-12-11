import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { getPhotoStoryBySlug } from "@/sanity/lib/getPhotoStoryBySlug"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function PhotoStoryPage({ params }: any) {
  const p = await params
  const slug = p.slug

  const photoStory = await getPhotoStoryBySlug(slug)

  if (!photoStory) {
    notFound()
  }

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <article className="story-article">
        <header className="story-header">
          <h1>{photoStory.title}</h1>
          <div className="story-meta">
            <span>By {photoStory.author?.name}</span>
            <span> • </span>
            <span>{timeAgo(photoStory.publishedAt)}</span>
            {photoStory.category && (
              <>
                <span> • </span>
                <Link href={`/${photoStory.category.slug}`}>
                  {photoStory.category.title}
                </Link>
              </>
            )}
          </div>
        </header>

        {photoStory.description && (
          <div className="story-description">
            <p>{photoStory.description}</p>
          </div>
        )}

        <div className="photo-gallery">
          {photoStory.images?.map((image: any, index: number) => (
            <div key={index} className="photo-item">
              <Image
                src={urlFor(image).width(1200).height(800).url()}
                alt={`${photoStory.title} - Photo ${index + 1}`}
                width={1200}
                height={800}
                style={{ width: "100%", height: "auto" }}
              />
            </div>
          ))}
        </div>

        {photoStory.tags && photoStory.tags.length > 0 && (
          <div className="story-tags">
            <h4>Tags:</h4>
            <div className="tag-list">
              {photoStory.tags.map((tag: any) => (
                <Link
                  key={tag.slug}
                  href={`/tag/${tag.slug}`}
                  className="tag"
                >
                  {tag.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </main>
  )
}
