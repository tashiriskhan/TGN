import { client } from "./sanity"

export async function getAllSpecial() {
  return client.fetch(`
    *[_type == "post" && isSpecial == true] 
      | order(publishedAt desc) {
        title,
        subtitle,
        specialTag,
        image,
        publishedAt,
        "slug": slug.current
      }
  `)
}
