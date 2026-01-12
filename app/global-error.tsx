"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <main className="error-page">
          <div className="error-container">
            <div className="error-content">
              <h1 className="error-title">Critical Error</h1>
              <p className="error-message">
                A critical error occurred. Please refresh the page.
              </p>
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
      </body>
    </html>
  );
}
