import { client } from "./sanity"

export async function getTrending() {
  return client.fetch(`
    *[_type == "post" && isTrending == true]
      | order(publishedAt desc)
      [0...2] {
        title,
        "slug": slug.current,
        mainImage,
        publishedAt,

        author->{ name, "slug": slug.current },
        categories[]->{ title, "slug": slug.current }
      }
  `)
}
