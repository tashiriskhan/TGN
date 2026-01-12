"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error:", error);
  }, [error]);

  return (
    <main className="error-page">
      <div className="error-container">
        <div className="error-content">
          <h1 className="error-title">Something Went Wrong</h1>
          <p className="error-message">
            We encountered an unexpected error. Please try again.
          </p>
          {error.digest && (
            <p className="error-digest">Error ID: {error.digest}</p>
          )}
          <div className="error-actions">
            <button onClick={reset} className="error-retry-btn">
              Try Again
            </button>
            <Link href="/" className="error-home-btn">
              Go Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
