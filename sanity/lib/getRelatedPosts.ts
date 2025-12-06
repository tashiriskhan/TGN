import { client } from "./sanity"

export async function getRelatedPosts(currentSlug: string, categorySlug?: string, tagSlugs?: string[]) {
  // Build the query to find related posts
  // First try to find posts in the same category
  // If not enough, also look for posts with matching tags
  // Exclude the current post

  let query = `
    *[_type == "post" && slug.current != $currentSlug && defined(slug.current)]
  `

  if (categorySlug) {
    query += ` && category->slug.current == $categorySlug`
  }

  if (tagSlugs && tagSlugs.length > 0) {
    query += ` && count(tags[slug.current in $tagSlugs]) > 0`
  }

  query += ` | order(publishedAt desc) [0...4] {
    title,
    "slug": slug.current,
    image,
    publishedAt,
    subtitle,

    author->{
      name,
      "slug": slug.current
    },
    category->{
      title,
      "slug": slug.current
    }
  }`

  return client.fetch(query, {
    currentSlug,
    categorySlug,
    tagSlugs
  })
}
