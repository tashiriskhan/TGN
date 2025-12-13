import { client } from "./sanity"

export async function getRightColumn() {
  return client.fetch(`
    *[_type == "post" && isRightColumn == true] | order(publishedAt desc)[0]{
      title,
      subtitle,
      mainImage,
      publishedAt,
      "slug": slug.current,

      author->{ name, "slug": slug.current },
      category->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `)
}
