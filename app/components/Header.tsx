"use client"
import Link from "next/link"
import { useState } from "react"

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  const closeMenu = () => {
    setMenuOpen(false)
  }

  return (
    <>
      {/* BBC HEADER (Centered Logo) */}
      <header className="bbc-header">
        <div className="container bbc-header-inner">
          <Link href="/" className="bbc-logo-link">
            <img src="/logo.svg" className="bbc-logo" alt="The Ground Narrative" />
          </Link>
        </div>
      </header>

      {/* BBC NAVIGATION */}
      <nav className="bbc-nav">
        <div className="container bbc-nav-inner">

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

          {/* CATEGORY LIST */}
          <ul id="bbc-nav-list" className={`bbc-nav-list ${menuOpen ? 'mobile-open' : ''}`}>

            {/* HOME */}
            <li><Link href="/" onClick={closeMenu}>Home</Link></li>

            {/* Dynamic categories from Sanity */}
            {/* Note: In production, fetch these from your CMS */}
            <li><Link href="/category/world" onClick={closeMenu}>World</Link></li>
            <li><Link href="/category/politics" onClick={closeMenu}>Politics</Link></li>
            <li><Link href="/category/technology" onClick={closeMenu}>Technology</Link></li>
            <li><Link href="/category/sports" onClick={closeMenu}>Sports</Link></li>
            <li><Link href="/category/business" onClick={closeMenu}>Business</Link></li>
            <li><Link href="/opinion" onClick={closeMenu}>Opinion</Link></li>
            <li><Link href="/features" onClick={closeMenu}>Features</Link></li>
            <li><Link href="/breaking" onClick={closeMenu}>Breaking</Link></li>

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
