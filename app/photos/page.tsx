// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import Link from "next/link"
import Image from "next/image"
import { client } from "@/sanity/lib/sanity"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import RightSidebar from "@/app/components/RightSidebar"
import Pagination from "@/app/components/Pagination"

const PAGE_SIZE = 12

export default async function PhotosPage({ searchParams }: any) {
  const s = await searchParams
  const page = Number(s.page) || 1
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const photoStories = await client.fetch(
    `*[_type == "photoStory"]
      | order(publishedAt desc)[$start...$end] {
        title,
        description,
        images,
        publishedAt,
        "slug": slug.current,
        author->{ name }
      }`,
    { start, end }
  )

  const totalStories = await client.fetch(
    `count(*[_type == "photoStory"])`
  )

  const totalPages = Math.ceil(totalStories / PAGE_SIZE)

  return (
    <main className="main-content-with-sidebar">
      <div className="container">
        <div className="main-content">
          <h1 style={{ marginBottom: "30px" }}>Photo Stories</h1>
          <p className="category-count" style={{ marginBottom: "20px" }}>
            {totalStories} {totalStories === 1 ? 'story' : 'stories'}
          </p>

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

          <Pagination currentPage={page} totalPages={totalPages} basePath="photos" />
        </div>
        <RightSidebar />
      </div>
    </main>
  )
}
