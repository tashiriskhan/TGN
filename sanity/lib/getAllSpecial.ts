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
        "slug": slug.current,

        author->{ name, "slug": slug.current },
        category->{ title, "slug": slug.current },
        tags[]->{ title, "slug": slug.current }
      }
  `)
}
