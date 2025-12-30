import { client } from "./sanity"
import { IN_DEPTH_QUERY } from "./queries"

export async function getAllInDepth() {
  return client.fetch(IN_DEPTH_QUERY)
}
