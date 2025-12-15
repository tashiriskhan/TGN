import { client } from "./sanity"

export async function getAllFeatured() {
  return client.fetch(`
    *[_type == "post" && isFeatured == true] | order(publishedAt desc){
      title,
      "slug": slug.current,
      mainImage,
      author->{ name, "slug": slug.current, image },
      categories[]->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `)
}
