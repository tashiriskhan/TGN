import { client } from "./sanity"

export async function getPhotoStoryBySlug(slug: string) {
  return client.fetch(`
    *[_type == "photoStory" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      description,
      mainImage,
      gallery,
      images,
      publishedAt,

      author->{ name, "slug": slug.current, image },
      categories[]->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `, { slug })
}
