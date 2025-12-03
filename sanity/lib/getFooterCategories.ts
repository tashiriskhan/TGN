import { client } from "./sanity"

export async function getFooterCategories() {
  return client.fetch(`
    *[_type == "category"] | order(title asc) {
      title,
      "slug": slug.current
    }
  `)
}
