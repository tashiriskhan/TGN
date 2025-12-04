import Link from "next/link"
import { getFooterCategories } from "@/sanity/lib/getFooterCategories"
import MobileNavToggle from "@/app/components/MobileNavToggle"

export default async function Header() {
  const categories = await getFooterCategories()

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
          <MobileNavToggle />

          {/* CATEGORY LIST */}
          <ul className="bbc-nav-list">

            {/* HOME */}
            <li><Link href="/">Home</Link></li>

            {/* Dynamic Sanity categories */}
            {categories.map((cat: any) => (
              <li key={cat.slug}>
                <Link href={`/category/${cat.slug}`}>
                  {cat.title}
                </Link>
              </li>
            ))}

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
