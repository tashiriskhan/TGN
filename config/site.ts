/**
 * Site Configuration
 * Centralized configuration for site branding, API routes, and constants
 */

// Site Branding
export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'The Ground Narrative',
  shortName: process.env.NEXT_PUBLIC_SITE_SHORT_NAME || 'Ground Narrative',
  description: process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Independent journalism covering Kashmir, India, and the world with depth and perspective.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://groundnarrative.com',
  locale: 'en-US',
  titleTemplate: '%s | The Ground Narrative',
}

// Theme Colors
export const themeColors = {
  light: {
    primary: '#bb1919',
    background: '#fafafa',
    text: '#1a1a1a',
    muted: '#71717a',
    border: '#e4e4e7',
  },
  dark: {
    background: '#0a0a0a',
    text: '#fafafa',
    muted: '#a1a1aa',
    border: '#27272a',
  },
  video: {
    background: '#0f141a',
    accent: '#f97316',
    primary: '#1e293b',
    secondary: '#334155',
  },
  photo: {
    background: '#0f141a',
    accent: '#f97316',
    primary: '#1e293b',
  },
  status: {
    error: '#dc2626',
    success: '#16a34a',
    warning: '#f59e0b',
  },
  social: {
    twitter: '#1da1f2',
    facebook: '#1877f2',
    linkedin: '#0077b5',
    instagram: '#e4405f',
    youtube: '#ff0000',
    reddit: '#ff4500',
    pinterest: '#bd081c',
  },
}

// API Routes
export const apiRoutes = {
  newsletter: '/api/newsletter',
  preview: '/api/preview',
}

// Social Media URLs
export const socialConfig = {
  facebook: 'https://www.facebook.com/GroundNarrative',
  instagram: 'https://instagram.com/groundnarrative',
  youtube: 'https://www.youtube.com/@TheGroundNarrative',
  x: 'https://x.com/GroundNarrative',
  reddit: 'https://reddit.com/u/GroundNarrative',
  pinterest: 'https://pinterest.com/groundnarrative',
  linkedin: 'https://linkedin.com/company/the-ground-narrative',
}

// Contact Emails
export const contactConfig = {
  general: 'info@groundnarrative.com',
  editorial: 'editorial@groundnarrative.com',
  support: 'groundnarrative@gmail.com',
  privacy: 'privacy@groundnarrative.com',
  legal: 'legal@groundnarrative.com',
  instagramHandle: '@thegroundnarrative',
}

// Developer/External Links
export const externalConfig = {
  developer: 'https://www.cosmicstack.org/',
  sanityCdnHostname: 'cdn.sanity.io',
}

// Default query limits
export const queryLimits = {
  trending: 10,
  breaking: 5,
  relatedPosts: 5,
  sidebarPosts: 5,
  photosPage: 12,
  videosPage: 12,
  podcastsPage: 12,
  excerptLength: 120,
  truncateTitleShort: 50,
  truncateTitleMedium: 65,
  truncateTitleLong: 80,
  truncateText: 60,
}

// Timeouts (milliseconds)
export const timeouts = {
  newsletterDelay: 500,
  copyFeedback: 2000,
  newsletterLoading: 1000,
  toastDuration: 2500,
}

// Image dimension presets
export const imageConfig = {
  logo: { width: 200, height: 52 },
  logoSm: { width: 150, height: 39 },
  hero: { width: 1920, height: 1080 },
  cardLarge: { width: 800, height: 500 },
  cardMedium: { width: 400, height: 250 },
  cardSmall: { width: 280, height: 160 },
  avatar: { width: 80, height: 80 },
  avatarSm: { width: 60, height: 60 },
  thumbnail: { width: 200, height: 150 },
  videoThumbnail: { width: 100, height: 56 },
  galleryLarge: { width: 1600, height: 1200 },
  ogImage: { width: 1200, height: 630 },
}

// Navigation routes
export const navRoutes = {
  home: '/',
  search: '/search',
  about: '/about',
  contact: '/contact',
  privacy: '/privacy',
  terms: '/terms',
  categories: {
    kashmir: '/kashmir',
    india: '/india',
    world: '/world',
  },
  media: {
    photos: '/photos',
    videos: '/videos',
    podcasts: '/podcasts',
  },
  story: '/story',
  author: '/author',
  tag: '/tag',
}

// Section titles (can be moved to Sanity for CMS management)
export const sectionTitles = {
  trending: 'Trending',
  inDepth: 'In Depth',
  special: 'Special Reports',
  opinion: 'Opinion',
  media: 'Watch & Listen',
  photoStories: 'Photo Stories',
  videos: 'Videos',
  podcasts: 'Podcasts',
  latestPhotography: 'Latest Photography',
  visualJournalism: 'Visual Journalism',
}

// Video section labels
export const videoLabels = {
  featured: 'Featured',
  trending: 'Trending',
  allVideos: 'All Videos',
  upNext: 'Up Next',
  shortVideos: 'Short Videos',
  playNow: 'Play Now',
  addToList: 'Add to List',
}

// Photo section labels
export const photoLabels = {
  heroTitle: 'Visual Journalism',
  heroSubtitle: 'Photo Stories',
  loadMore: 'Load More Stories',
  new: 'New',
  stayUpdated: 'Stay Updated',
  newsletterDesc: 'Get the latest visual narratives delivered to your inbox.',
}

// Form labels
export const formLabels = {
  emailPlaceholder: 'Your email',
  subscribe: 'Subscribe',
  subscribeSuccess: 'Thanks for subscribing!',
  copyLink: 'Copy Link',
  copied: 'Copied!',
  shareArticle: 'Share this article',
}

// Share labels
export const shareLabels = {
  twitter: 'Share on X',
  facebook: 'Share on Facebook',
  linkedin: 'Share on LinkedIn',
  copySuccess: 'Link copied to clipboard!',
}

// Footer labels
export const footerLabels = {
  aboutUs: 'About Us',
  quickLinks: 'Quick Links',
  media: 'Media',
  categories: 'Categories',
}
