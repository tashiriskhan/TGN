import Link from "next/link"
import { getFooterCategories } from "@/sanity/lib/getFooterCategories"
import { siteConfig, navRoutes, contactConfig, externalConfig, themeColors } from "@/config/site"
import { footerLabels } from "@/config/site"

export default async function Footer() {
  const categories = await getFooterCategories()

  return (
    <footer className="footer">
      <div className="footer-container">

        {/* COLUMN 1 — ABOUT US */}
        <div className="footer-col">
          <h4>{footerLabels.aboutUs}</h4>
          <p>
            {siteConfig.name} is an independent digital platform covering
            stories, news, and social issues with accuracy, depth,
            and a human perspective.
          </p>
          <p>Email: {contactConfig.support}</p>
          <p>Instagram: {contactConfig.instagramHandle}</p>
          <p>Facebook: {siteConfig.name}</p>
        </div>

        {/* COLUMN 2 — QUICK LINKS */}
        <div className="footer-col">
          <h4>{footerLabels.quickLinks}</h4>
          <Link href={navRoutes.about} className="footer-link">About</Link>
          <Link href={navRoutes.contact} className="footer-link">Contact</Link>
          <Link href={navRoutes.privacy} className="footer-link">Privacy Policy</Link>
          <Link href={navRoutes.terms} className="footer-link">Terms & Conditions</Link>
        </div>

        {/* COLUMN 3 — MEDIA */}
        <div className="footer-col">
          <h4>{footerLabels.media}</h4>
          <Link href={navRoutes.media.photos} className="footer-link">Photos</Link>
          <Link href={navRoutes.media.videos} className="footer-link">Videos</Link>
          <Link href={navRoutes.media.podcasts} className="footer-link">Podcasts</Link>
        </div>

        {/* COLUMN 4 — CATEGORIES (Dynamic from Sanity) */}
        <div className="footer-col">
          <h4>{footerLabels.categories}</h4>
          {categories.map((cat: any) => (
            <Link
              key={cat.slug}
              href={`/${cat.slug}`}
              className="footer-link"
            >
              {cat.title}
            </Link>
          ))}
        </div>

      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        © {new Date().getFullYear()} {siteConfig.name} — All Rights Reserved | This Website is made with <span style={{ color: themeColors.status.error }}>♥</span> by <a href={externalConfig.developer} className="footer-credit-link" target="_blank" rel="noopener noreferrer">COSMIC STACK</a>
      </div>
    </footer>
  )
}
