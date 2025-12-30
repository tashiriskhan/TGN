import { client } from "./sanity"
import { ALL_PHOTO_STORIES_QUERY } from "./queries"

export async function getAllPhotoStories() {
  return client.fetch(ALL_PHOTO_STORIES_QUERY)
}
