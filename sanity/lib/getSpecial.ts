import { client } from "./sanity"

export async function getSpecial() {
  return client.fetch(`
    *[_type == "post" && isSpecial == true][0]{
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
