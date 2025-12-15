import { client } from "./sanity"

export async function getAllPodcasts() {
  return client.fetch(`
    *[_type == "podcast"] | order(publishedAt desc) {
      title,
      "slug": slug.current,
      description,
      audioUrl,
      duration,
      thumbnail,
      publishedAt,

      author->{ name, "slug": slug.current },
      categories[]->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `)
}
