import { client } from "./sanity"
import { ALL_PODCASTS_QUERY } from "./queries"

export async function getAllPodcasts() {
  return client.fetch(ALL_PODCASTS_QUERY)
}
