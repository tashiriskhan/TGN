import Link from "next/link"
import { getFooterCategories } from "@/sanity/lib/getFooterCategories"

export default async function Footer() {
  const categories = await getFooterCategories()

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* COLUMN 1 — ABOUT US */}
        <div className="footer-col">
          <h4>About Us</h4>
          <p>
            The Ground Narrative is an independent digital platform covering 
            stories, news, and social issues with accuracy, depth, 
            and a human perspective.
          </p>

          <h4 style={{ marginTop: "20px" }}>Contact</h4>
          <p>Email: groundnarrative@gmail.com</p>
          <p>Instagram: @thegroundnarrative</p>
          <p>Facebook: The Ground Narrative</p>
        </div>

        {/* COLUMN 2 — QUICK LINKS */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <Link href="/about" className="footer-link">About</Link>
          <Link href="/contact" className="footer-link">Contact</Link>
          <Link href="/privacy-policy" className="footer-link">Privacy Policy</Link>
          <Link href="/terms" className="footer-link">Terms & Conditions</Link>
        </div>

        {/* COLUMN 3 — CATEGORIES (Dynamic from Sanity) */}
        <div className="footer-col">
          <h4>Categories</h4>
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

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} The Ground Narrative — All Rights Reserved.
      </div>
    </footer>
  )
}
