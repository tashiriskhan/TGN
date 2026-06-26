"use client"
import Link from "next/link"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import ThemeToggle from "./ThemeToggle"
import SocialIcons from "./SocialIcons"
import { useTheme } from "./ThemeProvider"
import { getFormattedTodayDate, getFormattedHijriDate } from "@/app/lib/dateHelper"
import { usePathname } from "next/navigation"
import { navRoutes, imageConfig, siteConfig } from "@/config/site"

export default function HeaderClient({ categories }: { categories: Array<{title: string, slug: string}> }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()
  const moreDropdownRef = useRef<HTMLLIElement>(null)

  // Preferred order for categories
  const preferredOrder = ['opinion', 'health', 'politics', 'technology', 'culture', 'business', 'science', 'sports', 'world']
  
  const sortedCategories = [...categories].sort((a, b) => {
    const indexA = preferredOrder.indexOf(a.slug || '')
    const indexB = preferredOrder.indexOf(b.slug || '')
    
    if (indexA === -1 && indexB === -1) return 0
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    
    return indexA - indexB
  })

  // Check if we're on a video or photos page - force white logo and dark theme
  const isVideoPage = pathname?.startsWith('/videos') || pathname?.startsWith('/video-stories')
  const isPhotosPage = pathname?.startsWith('/photos')

  // Force dark logo on video and photos pages
  const logoSrc = (isVideoPage || isPhotosPage) ? "/logo-w.svg" : (theme === "dark" ? "/logo-w.svg" : "/logo.svg")

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
    setMoreDropdownOpen(false)
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node
      const navList = document.getElementById('tgn-nav-list')
      const menuToggle = document.querySelector('.mobile-menu-toggle')

      // Close hamburger menu when clicking outside
      if (menuOpen && navList && !navList.contains(target) && !menuToggle?.contains(target)) {
        setMenuOpen(false)
      }

      // Close dropdowns when clicking outside
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(target)) {
        setMoreDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [menuOpen])

  return (
    <>
      {/* BBC HEADER (Centered Logo with date and social icons) - Desktop Only */}
      <header className="tgn-header">
        <div className="container tgn-header-inner-enhanced">
          {/* Left: Social Icons (swapped with date) */}
          <div className="header-date">
            <SocialIcons />
          </div>

          {/* Center: Logo */}
          <Link href="/" className="tgn-logo-link">
            <Image
              src={logoSrc}
              className="tgn-logo"
              alt={siteConfig.name}
              width={imageConfig.logo.width}
              height={imageConfig.logo.height}
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
      <nav className="tgn-nav">
        <div className="container tgn-nav-inner">

          {/* LEFT SIDE - Hamburger and Theme Toggle */}
          <div className="nav-left-controls">
            {/* MOBILE TOGGLE */}
            <button
              className="mobile-menu-toggle"
              onClick={toggleMenu}
              aria-expanded={menuOpen}
              aria-controls="tgn-nav-list"
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              {menuOpen ? '✕' : '☰'}
            </button>

            {/* THEME TOGGLE - Visible on mobile and desktop */}
            <div className="mobile-theme-toggle-inline">
              <ThemeToggle />
            </div>
          </div>

          {/* CENTER - Logo (Mobile Only) */}
          <Link href="/" className="tgn-logo-link mobile-nav-logo mobile-only">
            <Image
              src={logoSrc}
              className="tgn-logo"
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
          <ul id="tgn-nav-list" className={`tgn-nav-list ${menuOpen ? 'mobile-open' : ''}`}>

            {/* HOME */}
            <li><Link href={navRoutes.home} onClick={closeMenu}>Home</Link></li>

            {/* Dynamic Categories - Show first 6 categories */}
            {sortedCategories.filter(cat => cat.slug).slice(0, 6).map((category) => (
              <li key={category.slug}>
                <Link href={`/${category.slug}`} onClick={closeMenu}>
                  {category.title}
                </Link>
              </li>
            ))}

            {/* More Dropdown for remaining categories */}
            {sortedCategories.filter(cat => cat.slug).length > 6 && (
              <li className="nav-dropdown" ref={moreDropdownRef}>
                <button
                  className="nav-dropdown-toggle"
                  onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                  aria-expanded={moreDropdownOpen}
                  aria-haspopup="true"
                >
                  More <span className="dropdown-arrow">{moreDropdownOpen ? '▲' : '▼'}</span>
                </button>
                <ul className={`nav-dropdown-menu ${moreDropdownOpen ? 'open' : ''}`}>
                  {sortedCategories.filter(cat => cat.slug).slice(6).map((category) => (
                    <li key={category.slug}>
                      <Link href={`/${category.slug}`} onClick={closeMenu}>
                        {category.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            )}

            {/* SOCIAL ICONS - Mobile (inside hamburger menu) */}
            <li className="mobile-social-icons">
              <SocialIcons showToggle={true} />
            </li>

            {/* CLOSE ARROW - Mobile (at bottom of menu) */}
            <li className="mobile-menu-close">
              <button
                className="mobile-menu-close-btn"
                onClick={closeMenu}
                aria-label="Close navigation menu"
              >
                <span className="close-arrow">▲</span>
                <span className="close-text">Close Menu</span>
              </button>
            </li>

          </ul>

          {/* SEARCH */}
          <div className="tgn-nav-tools">
            <form action={navRoutes.search} method="GET">
              <input type="search" name="q" placeholder="Search…" />
            </form>
          </div>

        </div>
      </nav>

    </>
  )
}
