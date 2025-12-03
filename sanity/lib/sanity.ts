import { createClient } from '@sanity/client'
import { getFooterCategories } from "@/sanity/lib/getFooterCategories"


export const client = createClient({
  projectId: "bkexk006",
  dataset: "production",
  apiVersion: "2023-01-01",
  useCdn: true,
})
 