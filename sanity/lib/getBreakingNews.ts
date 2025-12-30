import { client } from "./sanity"
import { BREAKING_NEWS_QUERY } from "./queries"

export async function getBreakingNews() {
  return client.fetch(BREAKING_NEWS_QUERY)
}
