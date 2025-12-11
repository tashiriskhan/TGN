import { client } from "./sanity"

export async function getAllPhotoStories() {
  return client.fetch(`
    *[_type == "photoStory"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      description,
      images,
      publishedAt,

      author->{ name, "slug": slug.current },
      category->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `)
}
