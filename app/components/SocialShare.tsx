"use client"

import { useState, useEffect, useRef } from "react"
import { timeouts } from "@/config/site"

type SocialShareProps = {
  title: string
}

export default function SocialShare({ title }: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [showToast, setShowToast] = useState(false)
  const [currentUrl] = useState(() =>
    typeof window !== 'undefined' ? window.location.href : ''
  )
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }
    }
  }, [])

  const encodedUrl = encodeURIComponent(currentUrl)
  const encodedTitle = encodeURIComponent(title)

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setShowToast(true)

      // Clear any existing timeout
      if (toastTimeoutRef.current) {
        clearTimeout(toastTimeoutRef.current)
      }

      // Set timeout to hide toast and reset copied state
      toastTimeoutRef.current = setTimeout(() => {
        setShowToast(false)
        setCopied(false)
      }, timeouts.toastDuration)
    } catch (err) {
      console.error("Failed to copy: ", err)
    }
  }

  return (
    <>
      <div className="social-share">
        <h3 className="share-title">Share this article</h3>
        <div className="share-buttons">
          <a
            href={shareLinks.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn share-twitter"
            aria-label="Share on Twitter"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
            </svg>
            <span>Twitter</span>
          </a>

          <a
            href={shareLinks.facebook}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn share-facebook"
            aria-label="Share on Facebook"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
            </svg>
            <span>Facebook</span>
          </a>

          <a
            href={shareLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="share-btn share-linkedin"
            aria-label="Share on LinkedIn"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            <span>LinkedIn</span>
          </a>

          <button
            onClick={copyToClipboard}
            className="share-btn share-copy"
            aria-label="Copy link"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
            </svg>
            <span>{copied ? "Copied!" : "Copy Link"}</span>
          </button>
        </div>
      </div>

      {/* Toast Notification */}
      <div className={`toast-notification ${showToast ? 'show' : ''}`}>
        Link copied to clipboard!
      </div>
    </>
  )
}
