import { client } from "./sanity"

export async function getPodcastBySlug(slug: string) {
  return client.fetch(`
    *[_type == "podcast" && slug.current == $slug][0]{
      title,
      "slug": slug.current,
      description,
      audioUrl,
      duration,
      thumbnail,
      publishedAt,

      author->{ name, "slug": slug.current, image },
      categories[]->{ title, "slug": slug.current },
      tags[]->{ title, "slug": slug.current }
    }
  `, { slug })
}
