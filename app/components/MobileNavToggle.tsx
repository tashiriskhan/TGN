"use client"

export default function MobileNavToggle() {
  const toggleMenu = () => {
    const nav = document.querySelector(".bbc-nav-list")
    if (nav) nav.classList.toggle("mobile-open")
  }

  return (
    <div className="mobile-menu-toggle" onClick={toggleMenu}>
      ☰
    </div>
  )
}
