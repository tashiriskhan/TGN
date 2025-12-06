import { client } from "@/sanity/lib/sanity"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"

export default async function SearchPage({ searchParams }: any) {
  // Next.js 16 FIX
  const s = await searchParams
  const query = s.q || ""

  if (!query || query.trim().length < 1) {
    return (
      <main className="container search-page">
        <h1 className="search-title">Search Articles</h1>
        <p className="search-instruction">Type something in the search box.</p>
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
    <main className="container search-page">
      <h1 className="search-results-title">Search results for: "{query}"</h1>

      {results.length === 0 && (
        <p className="no-results">No results found.</p>
      )}

      <div className="search-results-grid">
        {results.map((post: any) => (
          <article key={post.slug} className="search-result-card">
            <Link href={`/story/${post.slug}`} className="search-result-link">
              {post.image && (
                <Image
                  src={urlFor(post.image).width(500).height(350).url()}
                  alt={post.title}
                  className="search-result-image"
                  width={500}
                  height={350}
                />
              )}

              <h3 className="search-result-title">{post.title}</h3>
              <p className="search-result-date">{timeAgo(post.publishedAt)}</p>
            </Link>
          </article>
        ))}
      </div>
    </main>
  )
}
