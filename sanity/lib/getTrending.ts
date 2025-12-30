import { client } from "./sanity"
import { TRENDING_QUERY } from "./queries"

export async function getTrending() {
  return client.fetch(TRENDING_QUERY)
}
