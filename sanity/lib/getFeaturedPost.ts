import { client } from "./sanity"

export async function getFeaturedPost() {
  return client.fetch(`
    *[_type == "post" && isFeatured == true] | order(publishedAt desc)[0]{
      title,
      body,
      excerpt,
      mainImage,
      publishedAt,
      "slug": slug.current,

      author->{ name, "slug": slug.current, image },
      categories[]->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `)
}
