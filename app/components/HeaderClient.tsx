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
  const [newsDropdownOpen, setNewsDropdownOpen] = useState(false)
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false)
  const { theme } = useTheme()
  const pathname = usePathname()
  const newsDropdownRef = useRef<HTMLLIElement>(null)
  const mediaDropdownRef = useRef<HTMLLIElement>(null)

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
    setNewsDropdownOpen(false)
    setMediaDropdownOpen(false)
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
      if (newsDropdownRef.current && !newsDropdownRef.current.contains(target)) {
        setNewsDropdownOpen(false)
      }
      if (mediaDropdownRef.current && !mediaDropdownRef.current.contains(target)) {
        setMediaDropdownOpen(false)
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

            {/* News Dropdown - Kashmir, India, World ONLY */}
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
               <li><Link href={navRoutes.categories.kashmir} onClick={closeMenu}>Kashmir</Link></li>
                <li><Link href={navRoutes.categories.india} onClick={closeMenu}>India</Link></li>
                <li><Link href={navRoutes.categories.world} onClick={closeMenu}>World</Link></li>
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
                <li><Link href={navRoutes.media.photos} onClick={closeMenu}>Photos</Link></li>
                <li><Link href={navRoutes.media.videos} onClick={closeMenu}>Videos</Link></li>
                <li><Link href={navRoutes.media.podcasts} onClick={closeMenu}>Podcasts</Link></li>
              </ul>
            </li>

            {/* Other Categories - Show all categories EXCEPT Kashmir, India, World */}
            {categories.filter(cat => !['kashmir', 'india', 'world'].includes(cat.slug)).map((category) => (
              <li key={category.slug}>
                <Link href={`/${category.slug}`} onClick={closeMenu}>
                  {category.title}
                </Link>
              </li>
            ))}

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
