import { client } from "./sanity"
import { OPINION_QUERY } from "./queries"

export async function getOpinion() {
  return client.fetch(OPINION_QUERY)
}
