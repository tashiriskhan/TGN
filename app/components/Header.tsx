"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import ThemeToggle from "./ThemeToggle"
import SocialIcons from "./SocialIcons"
import { getFormattedTodayDate, getFormattedHijriDate } from "@/app/lib/dateHelper"
import { useTheme } from "./ThemeProvider"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false)
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false)
  const { theme } = useTheme()
  const newsDropdownRef = useRef<HTMLDivElement>(null)
  const mediaDropdownRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(event.target as Node)) {
        setNewsDropdownOpen(false)
      }
      if (mediaDropdownRef.current && !mediaDropdownRef.current.contains(event.target as Node)) {
        setMediaDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <>
      {/* BBC HEADER (Centered Logo with date and social icons) - Desktop Only */}
      <header className="bbc-header">
        <div className="container bbc-header-inner-enhanced">
          {/* Left: Social Icons (swapped with date) */}
          <div className="header-date">
            <SocialIcons />
          </div>

          {/* Center: Logo */}
          <Link href="/" className="bbc-logo-link">
            <Image
              src={theme === "dark" ? "/logo-w.svg" : "/logo.svg"}
              className="bbc-logo"
              alt="The Ground Narrative"
              width={200}
              height={52}
              priority
            />
          </Link>

          {/* Right: Date (swapped with social icons) */}
          <div className="header-date">
            <div className="date-display">
              <div className="gregorian-date">{getFormattedTodayDate()}</div>
              <div className="date-separator">----------------------</div>
              <div className="hijri-date">{getFormattedHijriDate()}</div>
            </div>
          </div>
        </div>
      </header>

      {/* BBC NAVIGATION */}
      <nav className="bbc-nav">
        <div className="container bbc-nav-inner">

          {/* LEFT SIDE - Hamburger and Theme Toggle */}
          <div className="nav-left-controls">
            {/* MOBILE TOGGLE */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="bbc-nav-list"
              aria-label="Toggle navigation menu"
            >
              ☰
            </button>

            {/* THEME TOGGLE - Visible on mobile and desktop */}
            <div className="mobile-theme-toggle-inline">
              <ThemeToggle />
            </div>
          </div>

          {/* CENTER - Logo (Mobile Only) */}
          <Link href="/" className="bbc-logo-link mobile-nav-logo mobile-only">
            <Image
              src={theme === "dark" ? "/logo-w.svg" : "/logo.svg"}
              className="bbc-logo"
              alt="The Ground Narrative"
              width={150}
              height={39}
              priority
            />
          </Link>

          {/* RIGHT SIDE - Date (Mobile Only) */}
          <div className="header-date mobile-nav-date mobile-only">
            <div className="date-display">
              <div className="gregorian-date">{getFormattedTodayDate()}</div>
              <div className="date-separator">----------------------</div>
              <div className="hijri-date">{getFormattedHijriDate()}</div>
            </div>
          </div>

          {/* CATEGORY LIST */}
          <ul id="bbc-nav-list" className={`bbc-nav-list ${menuOpen ? 'mobile-open' : ''}`}>

            {/* HOME */}
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>

            {/* News Dropdown */}
            <li className="nav-dropdown" ref={newsDropdownRef}>
              <button
                className="nav-dropdown-toggle"
                onClick={() => setNewsDropdownOpen(!newsDropdownOpen)}
                aria-expanded={newsDropdownOpen}
                aria-haspopup="true"
              >
                News <span className="dropdown-arrow">{newsDropdownOpen ? '▲' : '▼'}</span>
              </button>
              <ul className={`nav-dropdown-menu ${newsDropdownOpen ? 'open' : ''}`}>
                <li><Link href="/kashmir" onClick={closeMenu}>Kashmir</Link></li>
                <li><Link href="/india" onClick={closeMenu}>India</Link></li>
                <li><Link href="/world" onClick={closeMenu}>World</Link></li>
              </ul>
            </li>

            {/* Media Dropdown */}
            <li className="nav-dropdown" ref={mediaDropdownRef}>
              <button
                className="nav-dropdown-toggle"
                onClick={() => setMediaDropdownOpen(!mediaDropdownOpen)}
                aria-expanded={mediaDropdownOpen}
                aria-haspopup="true"
              >
                Media <span className="dropdown-arrow">{mediaDropdownOpen ? '▲' : '▼'}</span>
              </button>
              <ul className={`nav-dropdown-menu ${mediaDropdownOpen ? 'open' : ''}`}>
                <li><Link href="/photos" onClick={closeMenu}>Photos</Link></li>
                <li><Link href="/videos" onClick={closeMenu}>Videos</Link></li>
                <li><Link href="/podcasts" onClick={closeMenu}>Podcasts</Link></li>
              </ul>
            </li>

            {/* Other Categories */}
            <li><Link href="/business" onClick={closeMenu}>Business</Link></li>
            <li><Link href="/technology" onClick={closeMenu}>Technology</Link></li>
            <li><Link href="/sports" onClick={closeMenu}>Sports</Link></li>
            <li><Link href="/entertainment" onClick={closeMenu}>Entertainment</Link></li>
            <li><Link href="/culture" onClick={closeMenu}>Culture</Link></li>

            {/* SOCIAL ICONS - Mobile (inside hamburger menu) */}
            <li className="mobile-social-icons">
              <SocialIcons showToggle={true} />
            </li>

          </ul>

          {/* SEARCH */}
          <div className="bbc-nav-tools">
            <form action="/search" method="GET">
              <input type="search" name="q" placeholder="Search…" />
            </form>
          </div>

        </div>
      </nav>

    </>
  )
}
