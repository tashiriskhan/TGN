import { ArticleMetaSkeleton, BreakingNewsSkeleton } from "@/app/components/Skeleton"
import { useMemo } from "react"

export default function Loading() {
  // Generate stable random widths once to avoid impure function calls during render
  const skeletonWidths = useMemo(
    () => Array.from({ length: 8 }, () => Math.random() * 40 + 60),
    []
  )
  return (
    <main className="container">
      <div className="b-page-grid">

        <section className="article-container">
          {/* HEADLINE SKELETON */}
          <div className="animate-pulse">
            <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-6"></div>
          </div>

          {/* META SKELETON */}
          <ArticleMetaSkeleton />

          {/* HERO IMAGE SKELETON */}
          <div className="bbc-hero-wrapper animate-pulse">
            <div className="w-full h-64 md:h-96 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>

          {/* ARTICLE CONTENT SKELETON */}
          <article className="bbc-article-body">
            <div className="space-y-4 animate-pulse">
              {skeletonWidths.map((width, i) => (
                <div
                  key={i}
                  className="h-4 bg-gray-200 dark:bg-gray-700 rounded"
                  style={{ width: `${width}%` }}
                ></div>
              ))}
            </div>
          </article>

          {/* TAGS SKELETON */}
          <div className="bbc-tags mt-6 animate-pulse">
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-24 inline-block mr-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-20 inline-block mr-2"></div>
            <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-16 inline-block"></div>
          </div>
        </section>

        {/* RIGHT SIDEBAR: BREAKING NEWS SKELETON */}
        <aside className="right-col">
          <div className="side-top">
            <div className="breaking-header">
              <span>BREAKING NEWS</span>
            </div>
            <BreakingNewsSkeleton />
          </div>
        </aside>
      </div>
    </main>
  )
}
