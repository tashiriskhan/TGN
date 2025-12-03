import { client } from "@/sanity/lib/sanity"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function SearchPage({ searchParams }: any) {
  // Next.js 16 FIX
  const s = await searchParams
  const query = s.q || ""

  if (!query || query.trim().length < 1) {
    return (
      <main className="container" style={{ padding: "40px 0" }}>
        <h1>Search Articles</h1>
        <p>Type something in the search box.</p>
      </main>
    )
  }

  // Search in title + subtitle + content
  const results = await client.fetch(
    `*[_type == "post" && (
        title match $q ||
        subtitle match $q ||
        content match $q
      )] 
      | order(publishedAt desc) {
        title,
        subtitle,
        image,
        publishedAt,
        "slug": slug.current
      }
    `,
    { q: `${query}*` } // partial match
  )

  return (
    <main className="container" style={{ padding: "40px 0" }}>
      <h1>Search results for: "{query}"</h1>

      {results.length === 0 && (
        <p>No results found.</p>
      )}

      <div className="list-cards" style={{ marginTop: 20 }}>
        {results.map((post: any) => (
          <article key={post.slug} className="card">
            <Link href={`/story/${post.slug}`} className="card-link">
              {post.image && (
                <img 
                  src={urlFor(post.image).url()} 
                  alt={post.title} 
                />
              )}

              <h3>{post.title}</h3>
              <p className="muted">{timeAgo(post.publishedAt)}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
