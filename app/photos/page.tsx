import Link from "next/link"
import Image from "next/image"
import { getAllPhotoStories } from "@/sanity/lib/getAllPhotoStories"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function PhotosPage() {
  const photoStories = await getAllPhotoStories()

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ marginBottom: "30px" }}>Photo Stories</h1>

      <div className="bbc-3col-grid">
        {photoStories?.map((story: any) => (
          <article key={story.slug} className="bbc-card">
            <Link href={`/photos/${story.slug}`}>
              {story.images && story.images.length > 0 && (
                <Image
                  className="bbc-card-img"
                  src={urlFor(story.images[0]).width(400).height(300).url()}
                  alt={story.title}
                  width={400}
                  height={300}
                />
              )}
              <div className="bbc-card-content">
                <h4>{story.title}</h4>
                {story.description && (
                  <p className="summary">
                    {story.description.slice(0, 100)}...
                  </p>
                )}
                <p className="meta">
                  {timeAgo(story.publishedAt)} • {story.author?.name}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {photoStories?.length === 0 && (
        <p style={{ textAlign: "center", padding: "40px" }}>
          No photo stories available yet.
        </p>
      )}
    </main>
  )
}
