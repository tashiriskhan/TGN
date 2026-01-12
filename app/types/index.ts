// Core type definitions for the news website

// ============ Post Types ============

export interface PostAuthor {
  name: string;
  bio?: string;
  slug: string;
  image?: SanityImage;
}

export interface PostCategory {
  title: string;
  slug: string;
}

export interface PostTag {
  title: string;
  slug: string;
}

export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
    metadata?: {
      lqip?: string;
      dimensions?: {
        width: number;
        height: number;
      };
    };
  };
  alt?: string;
  caption?: string;
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  subtitle?: string;
  body?: PortableTextBlock[];
  mainImage?: SanityImage;
  publishedAt: string;
  author?: PostAuthor;
  categories?: PostCategory[];
  tags?: PostTag[];
  isTrending?: boolean;
  isBreaking?: boolean;
  isFeatured?: boolean;
  isInDepth?: boolean;
  isSpecial?: boolean;
  isOpinion?: boolean;
  specialTag?: string;
}

// ============ Portable Text Types ============

export interface PortableTextBlock {
  _type: string;
  _key: string;
  children?: PortableTextChild[];
  style?: string;
  markDefs?: PortableTextMark[];
  [key: string]: unknown;
}

export interface PortableTextChild {
  _type: string;
  _key: string;
  text?: string;
  marks?: string[];
  value?: {
    href: string;
  };
}

export interface PortableTextMark {
  _type: string;
  _key: string;
  href?: string;
}

// ============ Trending/Featured Types ============

export interface TrendingPost {
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  author?: {
    name: string;
    slug: string;
    image?: SanityImage;
  };
  categories?: PostCategory[];
}

export interface FeaturedStory extends Post {}

export interface BreakingNews extends Post {}

// ============ Related Types ============

export interface RelatedPost {
  title: string;
  slug: string;
  excerpt?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  author?: PostAuthor;
  categories?: PostCategory[];
}

// ============ Pagination Types ============

export interface PaginationParams {
  page?: number;
  pageSize?: number;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

// ============ Search Types ============

export interface SearchResult {
  title: string;
  slug: string;
  subtitle?: string;
  mainImage?: SanityImage;
  publishedAt: string;
  excerpt?: string;
}

// ============ Photo Story Types ============

export interface PhotoStory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  mainImage?: SanityImage;
  gallery?: SanityImage[];
  images?: SanityImage[];
  publishedAt: string;
  author?: PostAuthor;
  categories?: PostCategory[];
  tags?: PostTag[];
}

// ============ Video Story Types ============

export interface VideoStory {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  videoUrl?: string;
  videoType?: 'youtube' | 'vimeo' | 'custom';
  isShort?: boolean;
  thumbnail?: SanityImage;
  publishedAt: string;
  author?: PostAuthor;
  categories?: PostCategory[];
  tags?: PostTag[];
}

// ============ Podcast Types ============

export interface Podcast {
  _id: string;
  title: string;
  slug: string;
  description?: string;
  audioUrl?: string;
  duration?: string;
  episodeNumber?: number;
  season?: number;
  thumbnail?: SanityImage;
  publishedAt: string;
  author?: PostAuthor;
}

// ============ Category Types ============

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

// ============ Author Types ============

export interface Author {
  _id: string;
  name: string;
  slug: string;
  bio?: string;
  image?: SanityImage;
  twitter?: string;
  instagram?: string;
  social?: {
    twitter?: string;
    instagram?: string;
    facebook?: string;
  };
}

// ============ Tag Types ============

export interface Tag {
  _id: string;
  title: string;
  slug: string;
}

// ============ Component Prop Types ============

export interface TimeAgoOptions {
  abbreviated?: boolean;
}

export interface TruncateOptions {
  maxLength: number;
  addEllipsis?: boolean;
  preserveWords?: boolean;
}

export interface ImageLoadOptions {
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  quality?: number;
}
