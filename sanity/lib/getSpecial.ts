import { client } from "./sanity"

export async function getSpecial() {
  return client.fetch(`
    *[_type == "post" && isSpecial == true] | order(publishedAt desc)[0]{
      title,
      subtitle,
      specialTag,
      mainImage,
      publishedAt,
      "slug": slug.current,

      author->{ name, "slug": slug.current },
      categories[]->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `)
}
