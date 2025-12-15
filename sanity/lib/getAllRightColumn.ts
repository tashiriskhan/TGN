import { client } from "./sanity"

export async function getAllRightColumn() {
  return client.fetch(`
    *[_type == "post" && isRightColumn == true]
      | order(publishedAt desc) {
        title,
        subtitle,
        mainImage,
        publishedAt,
        "slug": slug.current,

        author->{ name, "slug": slug.current },
        categories[]->{ title, "slug": slug.current },
        tags[]->{ title, "slug": slug.current }
      }
  `)
}
