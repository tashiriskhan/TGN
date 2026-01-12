import Link from "next/link";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-content">
          <h1 className="not-found-code">404</h1>
          <h2 className="not-found-title">Page Not Found</h2>
          <p className="not-found-message">
            Sorry, the page you're looking for doesn't exist or has been moved.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="not-found-home-btn">
              Go Home
            </Link>
            <Link href="/search" className="not-found-search-btn">
              Search Articles
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
