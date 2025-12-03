import { client } from "./sanity"

export async function getFeaturedPost() {
  return client.fetch(`
    *[_type == "post" && isFeatured == true][0]{
      title,
      content,
      image,
      publishedAt,
      "slug": slug.current,

      author->{ name, "slug": slug.current, image },
      category->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `)
}
