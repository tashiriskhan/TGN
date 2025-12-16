import { HeroSkeleton, TrendingCardSkeleton, BreakingNewsSkeleton, ArticleCardSkeleton } from "@/app/components/Skeleton"

export default function Loading() {
  return (
    <>
      <main className="container bbc-home">

        {/* TOP SECTION SKELETON */}
        <section className="bbc-top">

          {/* FEATURE SKELETON */}
          <div className="bbc-center-col">
            <HeroSkeleton />
          </div>

          {/* TRENDING SKELETON */}
          <div className="bbc-left-col">
            <div className="breaking-header">
              <span>TRENDING</span>
            </div>
            {Array.from({ length: 3 }).map((_, i) => (
              <TrendingCardSkeleton key={i} />
            ))}
          </div>

          {/* BREAKING SKELETON */}
          <div className="bbc-right-col">
            <BreakingNewsSkeleton />
          </div>

        </section>

        {/* IN DEPTH SKELETON */}
        <section>
          <h2 className="section-title">In Depth</h2>
          <div className="bbc-3col-grid">
            {Array.from({ length: 6 }).map((_, i) => (
              <ArticleCardSkeleton key={i} />
            ))}
          </div>
        </section>

        {/* SPECIAL REPORTS SKELETON */}
        <section className="bbc-special-2">
          <h2 className="section-title">Special Reports</h2>
          <div className="bbc-special-grid">
            {Array.from({ length: 3 }).map((_, i) => (
              <article key={i} className="special-card-2 animate-pulse">
                <div className="w-full h-48 bg-gray-200 dark:bg-gray-700"></div>
                <div className="special-card-2-content">
                  <div className="h-5 w-24 bg-gray-300 dark:bg-gray-600 rounded mb-2"></div>
                  <div className="h-7 w-3/4 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* OPINION SKELETON */}
        <section>
          <h2 className="section-title">Opinion</h2>
          <div className="bbc-opinion-grid">
            {Array.from({ length: 4 }).map((_, i) => (
              <article key={i} className="op-item-row animate-pulse">
                <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded"></div>
                <div className="op-item-content flex-1">
                  <div className="h-6 w-3/4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
                  <div className="h-4 w-full bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>
    </>
  )
}
