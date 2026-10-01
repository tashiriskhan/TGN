import Link from "next/link"

interface PaginationProps {
  currentPage: number
  totalPages: number
  basePath: string
  queryParams?: Record<string, string>
  /**
   * 'path' (default): page 1 = /basePath, page N = /basePath/page/N
   * 'query': page 1 = /basePath, page N = /basePath?page=N (for dynamic
   * routes such as /search that must read searchParams).
   */
  mode?: 'path' | 'query'
}

export default function Pagination({ currentPage, totalPages, basePath, queryParams = {}, mode = 'path' }: PaginationProps) {
  const createPageUrl = (page: number) => {
    const params = new URLSearchParams(queryParams)
    const base = `/${basePath}`

    if (mode === 'query') {
      if (page === 1) {
        return `${base}${params.toString() ? `?${params.toString()}` : ''}`
      }
      params.set('page', page.toString())
      return `${base}?${params.toString()}`
    }

    // Path mode
    const qs = params.toString()
    if (page === 1) {
      return qs ? `${base}?${qs}` : base
    }
    return qs ? `${base}/page/${page}?${qs}` : `${base}/page/${page}`
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
