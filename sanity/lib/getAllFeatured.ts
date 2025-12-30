import { client } from "./sanity"
import { FEATURED_POST_QUERY } from "./queries"

export async function getAllFeatured() {
  return client.fetch(FEATURED_POST_QUERY)
}
