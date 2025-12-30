import { client } from "./sanity"
import { FOOTER_CATEGORIES_QUERY } from "./queries"

export async function getFooterCategories() {
  return client.fetch(FOOTER_CATEGORIES_QUERY)
}
