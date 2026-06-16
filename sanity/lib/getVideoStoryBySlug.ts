import { client } from "./sanity"

export async function getVideoStoryBySlug(slug: string) {
  try {
    return await client.fetch(`
      *[_type == "videoStory" && slug.current == $slug][0]{
        title,
        "slug": slug.current,
        description,
        videoUrl,
        videoType,
        isShort,
        thumbnail,
        publishedAt,

        author->{ name, "slug": slug.current, image },
        categories[]->{ title, "slug": slug.current },
        tags[]->{ title, "slug": slug.current }
      }
    `, { slug })
  } catch (err) {
    console.error(`Failed to fetch video story for slug ${slug}:`, err)
    return null
  }
}
