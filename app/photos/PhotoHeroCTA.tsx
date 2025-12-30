"use client"

export default function PhotoHeroCTA() {
  const scrollToGallery = () => {
    const gallery = document.getElementById('photo-gallery')
    if (gallery) {
      const headerHeight = 120 // Approximate header height
      const y = gallery.getBoundingClientRect().top + window.scrollY - headerHeight
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <button
      className="photo-hero-cta"
      onClick={scrollToGallery}
      type="button"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <polygon points="10 8 16 12 10 16 10 8" fill="currentColor" />
      </svg>
      Explore Gallery
    </button>
  )
}
