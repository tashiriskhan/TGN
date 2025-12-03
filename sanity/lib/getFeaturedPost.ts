import { client } from "./sanity"

export async function getFeaturedPost() {
  return client.fetch(`
    *[_type == "post" && isFeatured == true][0]{
      title,
      content,
      image,
      author,
      publishedAt,
      "slug": slug.current
    }
  `)
}
