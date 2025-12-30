import { client } from "./sanity"
import { SPECIAL_REPORTS_QUERY } from "./queries"

export async function getAllSpecial() {
  return client.fetch(SPECIAL_REPORTS_QUERY)
}
