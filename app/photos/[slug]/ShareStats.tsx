"use client"

import { useState } from "react"
import { timeouts } from "@/config/site"

interface ShareStatsProps {
  shareCount?: number
  twitterMentions?: number
  facebookShares?: number
  title: string
}

export default function ShareStats({
  shareCount = 0,
  twitterMentions = 0,
  facebookShares = 0,
  title
}: ShareStatsProps) {
  const [copied, setCopied] = useState(false)

  const formatCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`
    return count.toString()
  }

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), timeouts.copyFeedback)
    } catch (err) {
      console.error("Failed to copy:", err)
    }
  }

  const handleShareTwitter = () => {
    const url = encodeURIComponent(window.location.href)
    const text = encodeURIComponent(title)
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank")
  }

  const handleShareFacebook = () => {
    const url = encodeURIComponent(window.location.href)
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank")
  }

  return (
    <aside className="share-stats-widget">
      <h3 className="widget-title">Share & Stats</h3>

      {/* Quick Share Buttons */}
      <div className="share-buttons">
        <button
          className="share-btn share-twitter"
          onClick={handleShareTwitter}
          title="Share on X"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>
        <button
          className="share-btn share-facebook"
          onClick={handleShareFacebook}
          title="Share on Facebook"
        >
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
        </button>
        <button
          className="share-btn share-copy"
          onClick={handleCopyLink}
          title="Copy link"
        >
          {copied ? (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="20 6 9 17 4 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
              <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
            </svg>
          )}
        </button>
      </div>

      {/* Share Stats */}
      <div className="share-stats-grid">
        <div className="stat-item">
          <span className="stat-value">{formatCount(shareCount)}</span>
          <span className="stat-label">Total Shares</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatCount(twitterMentions)}</span>
          <span className="stat-label">Mentions</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">{formatCount(facebookShares)}</span>
          <span className="stat-label">Facebook</span>
        </div>
      </div>

      {/* Engagement CTA */}
      <div className="share-cta">
        <p>Enjoyed this photo story?</p>
        <button className="share-cta-btn" onClick={handleShareTwitter}>
          Share Your Thoughts
        </button>
      </div>
    </aside>
  )
}
