import { createClient } from '@sanity/client'


export const client = createClient({
  projectId: "bkexk006",
  dataset: "production",
  apiVersion: "2025-12-01",
  useCdn: true,
})
 