import { client } from "./sanity"

export async function getAllFeatured() {
  return client.fetch(`
    *[_type == "post" && isFeatured == true]{
      title,
      "slug": slug.current,
      image
    }
  `)
}
