import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  queryParams?: Record<string, string>
}

export default function Pagination({ currentPage, totalPages, basePath, queryParams = {} }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(queryParams)

    if (page === 1) {
      return `/${basePath}${params.toString() ? `?${params.toString()}` : ''}`
    }
    params.set('page', page.toString())
    return `/${basePath}?${params.toString()}`
  }

  if (totalPages <= 1) return null

  return (
    <div className="pagination-box">
      {currentPage > 1 && (
        <Link href={createPageUrl(currentPage - 1)} className="pagination-btn">
          ← Previous
        </Link>
      )}

      <span className="pagination-info">
        Page {currentPage} of {totalPages}
      </span>

      {currentPage < totalPages && (
        <Link href={createPageUrl(currentPage + 1)} className="pagination-btn">
          Next →
        </Link>
      )}
    </div>
  )
}
