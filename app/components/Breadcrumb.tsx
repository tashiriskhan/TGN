import Link from "next/link"

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items?: BreadcrumbItem[]
}

export default function Breadcrumb({ items = [] }: BreadcrumbProps) {
  if (!items || items.length === 0) {
    return null
  }

  const baseSiteUrl = "https://www.groundnarrative.com";
  const jsonLdBreadcrumbList = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => {
      const itemUrl = item.href 
        ? (item.href.startsWith("http") ? item.href : `${baseSiteUrl}${item.href}`)
        : baseSiteUrl;
      return {
        "@type": "ListItem",
        "position": index + 1,
        "name": item.label,
        "item": itemUrl
      };
    })
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumbList) }}
      />
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <ol className="breadcrumb-list">
          {items.map((item, index) => {
            const isLast = index === items.length - 1
            const isFirst = index === 0

            return (
              <li key={index} className="breadcrumb-item">
                {item.href && !isLast ? (
                  <Link href={item.href} className={`breadcrumb-link ${isFirst ? 'breadcrumb-home' : ''}`}>
                    {isFirst && <span className="breadcrumb-icon">🏠</span>}
                    {item.label}
                  </Link>
                ) : (
                  <span className={`breadcrumb-current ${isLast ? 'breadcrumb-active' : ''}`}>
                    {isFirst && <span className="breadcrumb-icon">🏠</span>}
                    {item.label}
                  </span>
                )}
                {index < items.length - 1 && <span className="breadcrumb-separator">›</span>}
              </li>
            )
          })}
        </ol>
      </nav>
    </>
  )
}
