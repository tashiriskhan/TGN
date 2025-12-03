import Link from "next/link"
import { getFooterCategories } from "@/sanity/lib/getFooterCategories"

export default async function Header() {
  const categories = await getFooterCategories()

  return (
    <>

      {/* TOP BAR */}
      <div className="topbar">
        <div className="container topbar-inner">
          <div className="top-left">New Delhi • 12°C</div>
          <div className="top-right">
            <a href="#" className="icon">🔔</a>
            <a href="#" className="icon">✉️</a>
            <a href="#" className="signin">SIGN IN</a>
          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="site-header">
        <div className="container header-inner">
          <div className="brand">
  <Link href="/" className="brand-logo">
    <img src="logo.svg" className="logo-img" />
  </Link>

  <div className="brand-slogan">
    Stories That See Beyond Headlines
  </div>
</div>
        </div>
      </header>

      {/* NAVIGATION */}
      <nav className="main-nav">
        <div className="container nav-inner">
          <div className="mobile-menu-toggle">☰</div>

          {/* Dynamic category navigation */}
          <ul className="nav-list">

  {/* Fixed Homepage Link */}
  <li className="nav-item">
    <Link href="/">Home</Link>
  </li>

  {/* Dynamic Categories from Sanity */}
  {categories.map((cat: any) => (
    <li key={cat.slug} className="nav-item">
      <Link href={`/category/${cat.slug}`}>
        {cat.title}
      </Link>
    </li>
  ))}

</ul>

          <div className="nav-tools">
            <form action="/search" method="GET">
  <input 
    type="search" 
    name="q" 
    placeholder="Search…" 
    className="search-input"
  />
</form>
          </div>
        </div>
      </nav>

    </>
  )
}
