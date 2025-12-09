"use client"

import { useState } from 'react'

export interface SocialLink {
  name: string
  icon: string // Simple letter or symbol
  url: string
}

// Generic placeholder icons (not tied to specific platforms)
const primaryIcons: SocialLink[] = [
  { name: 'Platform A', icon: 'A', url: '#' },
  { name: 'Platform B', icon: 'B', url: '#' },
  { name: 'Platform C', icon: 'C', url: '#' },
]

const extraIcons: SocialLink[] = [
  { name: 'Platform D', icon: 'D', url: '#' },
  { name: 'Platform E', icon: 'E', url: '#' },
  { name: 'Platform F', icon: 'F', url: '#' },
  { name: 'Platform G', icon: 'G', url: '#' },
]

interface SocialIconsProps {
  showToggle?: boolean // Whether to show the expand/collapse toggle
}

export default function SocialIcons({ showToggle = true }: SocialIconsProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <div className="social-icons-wrapper">
      <div className={`social-icons-container ${isExpanded ? 'expanded' : ''} ${!showToggle ? 'no-toggle' : ''}`}>
        {/* Primary icons (always visible) */}
        {primaryIcons.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-circle"
            aria-label={link.name}
          >
            <span className="social-icon-text">{link.icon}</span>
          </a>
        ))}

        {/* Extra icons (expand horizontally with transition) */}
        <div className="social-icons-extra">
          {extraIcons.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-circle"
              aria-label={link.name}
            >
              <span className="social-icon-text">{link.icon}</span>
            </a>
          ))}
        </div>

        {/* Toggle button - only show if showToggle is true */}
        {showToggle && (
          <button
            type="button"
            onClick={toggleExpanded}
            className="social-toggle-circle"
            aria-label={isExpanded ? 'Hide extra social links' : 'Show more social links'}
            aria-expanded={isExpanded}
          >
            <span className="toggle-icon">{isExpanded ? '›' : '⋮'}</span>
          </button>
        )}
      </div>
    </div>
  )
}
