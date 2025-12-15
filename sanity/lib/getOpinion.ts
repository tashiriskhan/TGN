import { client } from "./sanity"

export async function getOpinion() {
  return client.fetch(`
    *[_type == "post" && isOpinion == true]
      | order(publishedAt desc)
      [0...5] {
        title,
        subtitle,
        "slug": slug.current,
        mainImage,
        publishedAt,

        author->{ name, "slug": slug.current },
        categories[]->{ title, "slug": slug.current }
      }
  `)
}
