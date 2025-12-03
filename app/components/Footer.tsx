import Link from "next/link"
import { getFooterCategories } from "@/sanity/lib/getFooterCategories"

export default async function Footer() {
  const categories = await getFooterCategories()

  return (
    <footer className="footer" style={{ padding: "40px 0", borderTop: "1px solid #ddd", marginTop: "40px" }}>
      <div className="container footer-links">
        {categories.map((cat: any) => (
          <Link 
            key={cat.slug}
            href={`/category/${cat.slug}`}
            className="footer-link"
          >
            {cat.title}
          </Link>
        ))}
      </div>
    </footer>
  )
}
