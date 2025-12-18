"use client"
import { useEffect, useState } from "react"

export default function MobileNavToggle() {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen(!menuOpen)
  }

  useEffect(() => {
    const nav = document.querySelector(".tgn-nav-list")

    if (nav) {
      if (menuOpen) {
        nav.classList.add("mobile-open")
        document.body.style.overflow = "hidden"  // prevent scroll when open
      } else {
        nav.classList.remove("mobile-open")
        document.body.style.overflow = "auto"    // restore scroll
      }
    }

    // Close menu on outside click
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOpen &&
        nav &&
        !nav.contains(event.target as Node) &&
        !(event.target as Element).classList.contains("mobile-menu-toggle")
      ) {
        setMenuOpen(false)
      }
    }

    document.addEventListener("click", handleClickOutside)

    return () => {
      document.removeEventListener("click", handleClickOutside)
      document.body.style.overflow = "auto"
    }
  }, [menuOpen])

  return (
    <div
      className="mobile-menu-toggle"
      onClick={toggleMenu}
      aria-expanded={menuOpen}
      aria-controls="tgn-nav-list"
      role="button"
      tabIndex={0}
      onKeyDown={e => { if (e.key === "Enter" || e.key === " ") toggleMenu() }}
    >
      ☰
    </div>
  )
}
