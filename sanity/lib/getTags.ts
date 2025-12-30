import { client } from "./sanity"
import { ALL_TAGS_QUERY } from "./queries"

export async function getTags() {
  return client.fetch(ALL_TAGS_QUERY)
}
