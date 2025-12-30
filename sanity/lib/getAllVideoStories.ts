import { client } from "./sanity"
import { ALL_VIDEO_STORIES_QUERY } from "./queries"

export async function getAllVideoStories() {
  return client.fetch(ALL_VIDEO_STORIES_QUERY)
}
