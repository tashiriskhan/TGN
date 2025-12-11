import Link from "next/link"
import Image from "next/image"
import { getAllPodcasts } from "@/sanity/lib/getAllPodcasts"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function PodcastsPage() {
  const podcasts = await getAllPodcasts()

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1 style={{ marginBottom: "30px" }}>Podcasts</h1>

      <div className="podcast-list">
        {podcasts?.map((podcast: any) => (
          <article key={podcast.slug} className="podcast-item">
            <Link href={`/podcasts/${podcast.slug}`}>
              <div className="podcast-thumbnail">
                {podcast.thumbnail ? (
                  <Image
                    src={urlFor(podcast.thumbnail).width(120).height(120).url()}
                    alt={podcast.title}
                    width={120}
                    height={120}
                  />
                ) : (
                  <div
                    style={{
                      width: "120px",
                      height: "120px",
                      background: "#f0f0f0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "48px",
                    }}
                  >
                    🎧
                  </div>
                )}
              </div>
              <div className="podcast-content">
                <h4>{podcast.title}</h4>
                {podcast.duration && (
                  <p className="podcast-duration">{podcast.duration}</p>
                )}
                {podcast.description && (
                  <p className="summary">
                    {podcast.description.slice(0, 150)}...
                  </p>
                )}
                <p className="meta">
                  {timeAgo(podcast.publishedAt)} • {podcast.author?.name}
                </p>
              </div>
            </Link>
          </article>
        ))}
      </div>

      {podcasts?.length === 0 && (
        <p style={{ textAlign: "center", padding: "40px" }}>
          No podcasts available yet.
        </p>
      )}
    </main>
  )
}
