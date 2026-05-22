import { ArticleCardSkeleton } from "@/app/components/Skeleton"

export default function Loading() {
  return (
    <main className="container author-page">
      {/* AUTHOR HEADER SKELETON */}
      <section className="author-header">
        <div className="animate-pulse">
          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-lg"></div>
        </div>
        <div className="author-info">
          <div className="animate-pulse">
            <div className="h-10 w-64 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-6 w-96 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
            <div className="h-6 w-80 bg-gray-200 dark:bg-gray-700 rounded mb-3"></div>
            <div className="h-5 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
          </div>
        </div>
      </section>

      <div className="animate-pulse">
        <div className="h-8 w-80 bg-gray-200 dark:bg-gray-700 rounded mb-6"></div>
      </div>

      {/* AUTHOR ARTICLES SKELETON */}
      <div className="author-posts-grid">
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
