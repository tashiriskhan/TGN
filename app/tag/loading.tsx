import { ArticleCardSkeleton } from "@/app/components/Skeleton"

export default function Loading() {
  return (
    <main className="container category-page">
      <div className="category-header">
        <h1 className="category-title">Loading...</h1>
      </div>

      <div className="category-grid">
        {Array.from({ length: 9 }).map((_, i) => (
          <ArticleCardSkeleton key={i} />
        ))}
      </div>

      {/* PAGINATION SKELETON */}
      <div className="pagination-box">
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
        <div className="h-10 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
      </div>
    </main>
  )
}
