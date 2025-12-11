import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId } from '../env'

export const client = createClient({
  projectId: "bkexk006",
  dataset: "production",
  apiVersion: "2025-12-01",
  useCdn: true, // Set to false if statically generating pages, using ISR or tag-based revalidation
})
