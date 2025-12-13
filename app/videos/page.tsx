// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import Link from "next/link"
import Image from "next/image"
import { getAllVideoStories } from "@/sanity/lib/getAllVideoStories"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import RightSidebar from "@/app/components/RightSidebar"

export default async function VideosPage() {
  const videoStories = await getAllVideoStories()

  return (
    <main className="main-content-with-sidebar">
      <div className="container">
        <div className="main-content">
          <h1 style={{ marginBottom: "30px" }}>Video Stories</h1>

          <div className="bbc-3col-grid">
            {videoStories?.map((story: any) => (
              <article key={story.slug} className="bbc-card">
                <Link href={`/videos/${story.slug}`}>
                  <div style={{ position: "relative" }}>
                    {story.thumbnail && (
                      <Image
                        className="bbc-card-img"
                        src={urlFor(story.thumbnail).width(400).height(300).url()}
                        alt={story.title}
                        width={400}
                        height={300}
                      />
                    )}
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        background: "rgba(0, 0, 0, 0.7)",
                        borderRadius: "50%",
                        width: "60px",
                        height: "60px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "24px",
                        color: "white",
                      }}
                    >
                      ▶
                    </div>
                  </div>
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

          {videoStories?.length === 0 && (
            <p style={{ textAlign: "center", padding: "40px" }}>
              No video stories available yet.
            </p>
          )}
        </div>
        <RightSidebar />
      </div>
    </main>
  )
}
