import { client } from "./sanity"
import { FOOTER_CATEGORIES_QUERY } from "./queries"

export async function getFooterCategories() {
  try {
    const categories = await client.fetch(FOOTER_CATEGORIES_QUERY)
    return Array.isArray(categories) ? categories : []
  } catch (err) {
    console.error("Failed to fetch footer categories from Sanity, using fallbacks:", err)
    return [
      { title: "World", slug: "world" },
      { title: "Politics", slug: "politics" },
      { title: "Human Stories", slug: "human-stories" },
      { title: "Geopolitics", slug: "geopolitics" },
      { title: "Conflict", slug: "conflict" },
      { title: "Culture", slug: "culture" }
    ]
  }
}
