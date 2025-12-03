import { client } from "./sanity"

export async function getRightColumn() {
  return client.fetch(`
    *[_type == "post" && isRightColumn == true][0]{
      title,
      subtitle,
      image,
      publishedAt,
      "slug": slug.current
    }
  `)
}
