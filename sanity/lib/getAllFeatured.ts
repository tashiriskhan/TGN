import { client } from "./sanity"

export async function getAllFeatured() {
  return client.fetch(`
    *[_type == "post" && isFeatured == true]{
      title,
      "slug": slug.current,
      image,
      author->{ name, "slug": slug.current, image },
      category->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `)
}
