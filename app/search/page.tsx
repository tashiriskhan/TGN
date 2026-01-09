// Always fetch fresh data from Sanity
export const dynamic = "force-dynamic";

import { client } from "@/sanity/lib/sanity"
import Link from "next/link"
import Image from "next/image"
import { urlFor } from "@/sanity/lib/image"
import { timeAgo } from "@/sanity/lib/timeAgo"
import RightSidebar from "@/app/components/RightSidebar"
import Pagination from "@/app/components/Pagination"
import { getBreakingNews } from "@/sanity/lib/getBreakingNews"
import { getTrending } from "@/sanity/lib/getTrending"

const PAGE_SIZE = 12

export default async function SearchPage({ searchParams }: any) {
  // Next.js 16 FIX
  const s = await searchParams
  const query = s.q || ""
  const page = Number(s.page) || 1

  // Fetch data for sidebar (used in both branches)
  const [breaking, trending, recentStories] = await Promise.all([
    getBreakingNews(),
    getTrending(),
    client.fetch(`*[_type == "post"] | order(publishedAt desc)[0...5]{
      title,
      mainImage,
      publishedAt,
      "slug": slug.current
    }`)
  ])

  if (!query || query.trim().length < 1) {
    return (
      <main className="main-content-with-sidebar">
        <div className="container">
          <div className="main-content">
            <h1 className="search-title">Search Articles</h1>
            <p className="search-instruction">Type something in the search box.</p>
          </div>
          <RightSidebar breaking={breaking} trending={trending} recentStories={recentStories} />
        </div>
      </main>
    )
  }

  // Search in title + subtitle + body
  const start = (page - 1) * PAGE_SIZE
  const end = start + PAGE_SIZE

  const results = await client.fetch(
    `*[_type == "post" && (
        title match $q ||
        subtitle match $q ||
        pt::text(body) match $q
      )]
      | order(publishedAt desc)[$start...$end] {
        title,
        subtitle,
        mainImage,
        publishedAt,
        "slug": slug.current
      }
    `,
    { q: `${query}*`, start, end } // partial match with pagination
  )

  const totalResults = await client.fetch(
    `count(*[_type == "post" && (
        title match $q ||
        subtitle match $q ||
        pt::text(body) match $q
      )])`,
    { q: `${query}*` }
  )

  const totalPages = Math.ceil(totalResults / PAGE_SIZE)

  return (
    <main className="main-content-with-sidebar">
      <div className="container">
        <div className="main-content">
          <h1 className="search-results-title">Search results for: "{query}"</h1>
          <p className="category-count" style={{ marginBottom: "20px" }}>
            {totalResults} {totalResults === 1 ? 'result' : 'results'}
          </p>

          {results.length === 0 && (
            <p className="no-results">No results found.</p>
          )}

          <div className="search-results-grid">
            {results.map((post: any) => (
              <article key={post.slug} className="search-result-card">
                <Link href={`/story/${post.slug}`} className="search-result-link">
                  {post.mainImage && (
                    <Image
                      src={urlFor(post.mainImage).width(500).height(350).url()}
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

          {totalResults > 0 && (
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              basePath="search"
              queryParams={{ q: query }}
            />
          )}
        </div>
        <RightSidebar breaking={breaking} trending={trending} recentStories={recentStories} />
      </div>
    </main>
  )
}
