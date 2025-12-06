"use client"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import ThemeToggle from "./ThemeToggle"
import SocialIcons from "./SocialIcons"
import { getFormattedTodayDate } from "@/app/lib/dateHelper"

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
      {/* BBC HEADER (Centered Logo with date and social icons) */}
      <header className="bbc-header">
        <div className="container bbc-header-inner-enhanced">
          {/* Left: Date */}
          <div className="header-date">
            {getFormattedTodayDate()}
          </div>

          {/* Center: Logo */}
          <Link href="/" className="bbc-logo-link">
            <Image
              src="/logo.svg"
              className="bbc-logo"
              alt="The Ground Narrative"
              width={200}
              height={52}
              priority
            />
          </Link>

          {/* Right: Social Icons */}
          <SocialIcons />
        </div>
      </header>

      {/* BBC NAVIGATION */}
      <nav className="bbc-nav">
        <div className="container bbc-nav-inner">

          {/* LEFT SIDE */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
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

            {/* THEME TOGGLE - Desktop */}
            <ThemeToggle />
          </div>

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

            {/* THEME TOGGLE - Mobile */}
            

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
