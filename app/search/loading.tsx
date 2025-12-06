import { ArticleCardSkeleton } from "@/app/components/Skeleton"

export default function Loading() {
  return (
    <main className="container search-page">
      <div className="animate-pulse">
        <div className="h-10 w-80 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
      </div>

      <div className="search-results-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>
    </main>
  )
}
