import { client } from "./sanity"

export async function getAllRightColumn() {
  return client.fetch(`
    *[_type == "post" && isRightColumn == true] 
      | order(publishedAt desc) {
        title,
        subtitle,
        image,
        publishedAt,
        "slug": slug.current
      }
  `)
}
