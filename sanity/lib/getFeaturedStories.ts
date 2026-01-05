import { client } from "./sanity"

export async function getFeaturedStories() {
  return client.fetch(`
    *[_type == "post" && isFeatured == true] | order(publishedAt desc)[0...5]{
      title,
      excerpt,
      mainImage,
      publishedAt,
      "slug": slug.current,
      author->{ name, "slug": slug.current, image },
      categories[]->{ title, "slug": slug.current }
    }
  `)
}
