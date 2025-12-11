import { client } from "./sanity"

export async function getVideoStoryBySlug(slug: string) {
  return client.fetch(`
    *[_type == "videoStory" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      description,
      videoUrl,
      thumbnail,
      publishedAt,

      author->{ name, "slug": slug.current, image },
      category->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `, { slug })
}
