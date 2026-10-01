// Single Sanity client for the whole app.
// next-sanity's createClient integrates with the Next.js fetch cache and
// supports per-query `next: { revalidate, tags }` options, so we re-export it
// here instead of maintaining a second @sanity/client instance.
export { client } from './client'
