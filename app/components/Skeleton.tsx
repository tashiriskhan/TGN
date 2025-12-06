interface SkeletonProps {
  className?: string
}

export function Skeleton({ className = '' }: SkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700 rounded ${className}`}
    />
  )
}

export function ArticleCardSkeleton() {
  return (
    <article className="bbc-card">
      <Skeleton className="bbc-card-img w-full h-48" />
      <div className="bbc-card-content">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3 mb-2" />
        <Skeleton className="h-3 w-1/3" />
      </div>
    </article>
  )
}

export function HeroSkeleton() {
  return (
    <article className="bbc-hero">
      <Skeleton className="bbc-hero-img w-full h-64 md:h-80" />
      <div className="bbc-hero-content">
        <Skeleton className="h-8 w-3/4 mb-3" />
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-5 w-5/6 mb-3" />
        <Skeleton className="h-4 w-1/3" />
      </div>
    </article>
  )
}

export function TrendingCardSkeleton() {
  return (
    <article className="trending-horizontal">
      <Skeleton className="trending-img-small w-24 h-20" />
      <div className="trending-content flex-1">
        <Skeleton className="h-5 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </div>
    </article>
  )
}

export function BreakingNewsSkeleton() {
  return (
    <ul className="breaking-list">
      {Array.from({ length: 5 }).map((_, i) => (
        <li key={i} className="mb-4">
          <Skeleton className="h-5 w-full mb-2" />
          <Skeleton className="h-3 w-1/4" />
        </li>
      ))}
    </ul>
  )
}

export function ArticleMetaSkeleton() {
  return (
    <div className="bbc-article-meta">
      <Skeleton className="h-4 w-16" />
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-20" />
      <Skeleton className="h-4 w-4" />
      <Skeleton className="h-4 w-24" />
    </div>
  )
}
