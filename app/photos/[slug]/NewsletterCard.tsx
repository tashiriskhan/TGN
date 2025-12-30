"use client"

import { useState } from "react"
import { timeouts } from "@/config/site"

interface NewsletterCardProps {
  heroImage?: string | null
}

export default function NewsletterCard({ heroImage }: NewsletterCardProps) {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) return

    setStatus("loading")

    try {
      // In production, this would call your API endpoint
      await new Promise((resolve) => setTimeout(resolve, timeouts.newsletterLoading))
      setStatus("success")
      setEmail("")
    } catch (error) {
      setStatus("error")
    }
  }

  return (
    <section className="photo-newsletter-section">
      <div className="photo-newsletter-card">
        {/* Background Image (blurred hero photo) */}
        {heroImage && (
          <div
            className="photo-newsletter-bg-image"
            style={{ backgroundImage: `url(${heroImage})` }}
          />
        )}

        {/* Gradient Overlay */}
        <div className="photo-newsletter-overlay" />

        {/* Content */}
        <div className="photo-newsletter-content">
          <div className="photo-newsletter-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
              <line x1="16" y1="2" x2="16" y2="6" />
              <line x1="8" y1="2" x2="8" y2="6" />
              <line x1="3" y1="10" x2="21" y2="10" />
              <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01M16 18h.01" />
            </svg>
          </div>

          <div className="photo-newsletter-text">
            <h3 className="photo-newsletter-title">Stay Updated</h3>
            <p className="photo-newsletter-desc">
              Get the latest visual narratives delivered to your inbox.
            </p>
          </div>

          {status === "success" ? (
            <div className="photo-newsletter-success">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              <span>Thanks for subscribing!</span>
            </div>
          ) : (
            <form className="photo-newsletter-form" onSubmit={handleSubmit}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="photo-newsletter-input"
                required
                disabled={status === "loading"}
              />
              <button
                type="submit"
                className="photo-newsletter-btn"
                disabled={status === "loading"}
              >
                {status === "loading" ? (
                  <span className="photo-newsletter-spinner" />
                ) : (
                  <>
                    Subscribe
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
