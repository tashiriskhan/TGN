import { client } from "./sanity"

export async function getBreakingNews() {
  return client.fetch(`
    *[_type == "post" && isBreaking == true] | order(publishedAt desc)[0...5] {
      title,
      "slug": slug.current,
      mainImage,
      publishedAt,

      author->{ name, "slug": slug.current }
    }
  `)
}
