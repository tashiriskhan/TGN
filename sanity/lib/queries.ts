/**
 * Centralized GROQ Queries for Sanity
 * All queries are defined here for easy maintenance and reuse
 */

import { queryLimits } from '@/config/site'

// Base post fields (reused across queries)
export const POST_FIELDS = `
  title,
  "slug": slug.current,
  mainImage,
  publishedAt,
  excerpt,
  subtitle,
  author->{ name, "slug": slug.current, image },
  categories[]->{ title, "slug": slug.current },
  tags[]->{ title, "slug": slug.current }
`

// Base photo story fields
export const PHOTO_STORY_FIELDS = `
  title,
  "slug": slug.current,
  description,
  images,
  publishedAt,
  coverImage,
  author->{ name, "slug": slug.current, image, bio, location },
  categories[]->{ title, "slug": slug.current },
  tags[]->{ title, "slug": slug.current }
`

// Base video story fields
export const VIDEO_STORY_FIELDS = `
  title,
  "slug": slug.current,
  description,
  videoUrl,
  videoType,
  isShort,
  thumbnail,
  publishedAt,
  author->{ name, "slug": slug.current, image },
  categories[]->{ title, "slug": slug.current },
  tags[]->{ title, "slug": slug.current }
`

// Full post fields with body
export const POST_FULL_FIELDS = `
  ${POST_FIELDS},
  body,
  isTrending,
  specialTag
`

// ============ TRENDING QUERIES ============

export const TRENDING_QUERY = `
  *[_type == "post" && isTrending == true]
    | order(publishedAt desc)
    [0...${queryLimits.trending}] {
      ${POST_FIELDS}
    }
`

// ============ BREAKING NEWS QUERIES ============

export const BREAKING_NEWS_QUERY = `
  *[_type == "post" && isBreaking == true]
    | order(publishedAt desc)
    [0...${queryLimits.breaking}] {
      ${POST_FIELDS}
    }
`

// ============ FEATURED POST QUERIES ============

export const FEATURED_POST_QUERY = `
  *[_type == "post" && isFeatured == true]
    | order(publishedAt desc)
    [0...3] {
      ${POST_FIELDS}
    }
`

// ============ IN-DEPTH QUERIES ============

export const IN_DEPTH_QUERY = `
  *[_type == "post" && isInDepth == true]
    | order(publishedAt desc)
    [0...4] {
      ${POST_FIELDS},
      subtitle
    }
`

// ============ SPECIAL REPORTS QUERIES ============

export const SPECIAL_REPORTS_QUERY = `
  *[_type == "post" && isSpecial == true]
    | order(publishedAt desc)
    [0...4] {
      ${POST_FIELDS},
      subtitle,
      specialTag
    }
`

// ============ OPINION QUERIES ============

export const OPINION_QUERY = `
  *[_type == "post" && isOpinion == true]
    | order(publishedAt desc)
    [0...5] {
      ${POST_FIELDS},
      subtitle
    }
`

// ============ PHOTO STORIES QUERIES ============

export const ALL_PHOTO_STORIES_QUERY = `
  *[_type == "photoStory"]
    | order(publishedAt desc) {
      ${PHOTO_STORY_FIELDS}
    }
`

export const PHOTO_STORY_BY_SLUG_QUERY = `
  *[_type == "photoStory" && slug.current == $slug][0] {
    ${PHOTO_STORY_FIELDS}
  }
`

export const PHOTO_STORIES_LIMITED_QUERY = `
  *[_type == "photoStory"]
    | order(publishedAt desc)
    [0...${queryLimits.photosPage}] {
      ${PHOTO_STORY_FIELDS}
    }
`

// ============ VIDEO STORIES QUERIES ============

export const ALL_VIDEO_STORIES_QUERY = `
  *[_type == "videoStory"]
    | order(publishedAt desc) {
      ${VIDEO_STORY_FIELDS}
    }
`

export const VIDEO_STORY_BY_SLUG_QUERY = `
  *[_type == "videoStory" && slug.current == $slug][0] {
    ${VIDEO_STORY_FIELDS}
  }
`

export const VIDEO_STORIES_LIMITED_QUERY = `
  *[_type == "videoStory"]
    | order(publishedAt desc)
    [0...${queryLimits.videosPage}] {
      ${VIDEO_STORY_FIELDS}
    }
`

export const FEATURED_VIDEO_QUERY = `
  *[_type == "videoStory" && defined(featured) && featured == true]
    | order(publishedAt desc)
    [0...1] {
      ${VIDEO_STORY_FIELDS}
    }
`

// ============ PODCAST QUERIES ============

export const ALL_PODCASTS_QUERY = `
  *[_type == "podcast"]
    | order(publishedAt desc) {
      title,
      "slug": slug.current,
      description,
      audioUrl,
      episodeNumber,
      season,
      publishedAt,
      coverImage,
      author->{ name, "slug": slug.current }
    }
`

export const PODCAST_BY_SLUG_QUERY = `
  *[_type == "podcast" && slug.current == $slug][0] {
    title,
    "slug": slug.current,
    description,
    audioUrl,
    episodeNumber,
    season,
    publishedAt,
    coverImage,
    author->{ name, "slug": slug.current, image, bio }
  }
`

export const PODCASTS_LIMITED_QUERY = `
  *[_type == "podcast"]
    | order(publishedAt desc)
    [0...${queryLimits.podcastsPage}] {
      title,
      "slug": slug.current,
      description,
      audioUrl,
      episodeNumber,
      season,
      publishedAt,
      coverImage,
      author->{ name, "slug": slug.current }
    }
`

// ============ SINGLE POST QUERIES ============

export const POST_BY_SLUG_QUERY = `
  *[_type == "post" && slug.current == $slug][0] {
    ${POST_FULL_FIELDS}
  }
`

export const POST_BY_CATEGORY_QUERY = `
  *[_type == "post" && $category in categories[]->slug.current]
    | order(publishedAt desc)
    [0...20] {
      ${POST_FIELDS}
    }
`

// ============ RELATED POSTS QUERIES ============

export const RELATED_POSTS_QUERY = `
  *[_type == "post" && slug.current != $slug
    && count((categories[]->slug.current)[@ in ^.categories[]->slug.current]) > 0]
    | order(publishedAt desc)
    [0...${queryLimits.relatedPosts}] {
      ${POST_FIELDS}
    }
`

// ============ AUTHOR QUERIES ============

export const POSTS_BY_AUTHOR_QUERY = `
  *[_type == "post" && author->slug.current == $slug]
    | order(publishedAt desc) {
      ${POST_FIELDS}
    }
`

export const AUTHOR_PROFILE_QUERY = `
  *[_type == "author" && slug.current == $slug][0] {
    name,
    "slug": slug.current,
    image,
    bio,
    social
  }
`

// ============ TAG QUERIES ============

export const POSTS_BY_TAG_QUERY = `
  *[_type == "post" && $tag in tags[]->slug.current]
    | order(publishedAt desc) {
      ${POST_FIELDS}
    }
`

export const ALL_TAGS_QUERY = `
  *[_type == "tag"] {
    title,
    "slug": slug.current
  }
`

// ============ CATEGORY QUERIES ============

export const ALL_CATEGORIES_QUERY = `
  *[_type == "category"] {
    title,
    "slug": slug.current
  }
`

export const FOOTER_CATEGORIES_QUERY = `
  *[_type == "category"] | order(title asc) {
    title,
    "slug": slug.current
  }
`

// ============ SEARCH QUERIES ============

export const SEARCH_QUERY = `
  *[_type == "post" && (
    title match $query ||
    body[].children[].text match $query
  )]
    | order(publishedAt desc)
    [0...30] {
      ${POST_FIELDS}
    }
`

// ============ SITEMAP QUERIES ============

export const SITEMAP_POSTS_QUERY = `
  *[_type == "post" && defined(slug.current)]
    | order(publishedAt desc)[0...1000] {
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }
`

export const SITEMAP_PHOTOS_QUERY = `
  *[_type == "photoStory" && defined(slug.current)]
    | order(publishedAt desc)[0...1000] {
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }
`

export const SITEMAP_VIDEOS_QUERY = `
  *[_type == "videoStory" && defined(slug.current)]
    | order(publishedAt desc)[0...1000] {
      "slug": slug.current,
      publishedAt,
      _updatedAt
    }
`
