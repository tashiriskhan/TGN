import { client } from "./sanity"

export async function getAllVideoStories() {
  return client.fetch(`
    *[_type == "videoStory"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      description,
      videoUrl,
      thumbnail,
      publishedAt,

      author->{ name, "slug": slug.current },
      category->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `)
}
