# Optimization Report

## Summary

This report documents the comprehensive refactoring and optimization changes applied to the Next.js/React news site.

---

## Phase 1: Config-Driven Architecture

### Files Created

| File | Purpose |
|------|---------|
| `config/site.ts` | Centralized site configuration (branding, colors, API routes, social URLs, timeouts, image dimensions, navigation) |
| `sanity/lib/queries.ts` | Centralized GROQ queries for all Sanity data fetching |
| `app/lib/imageConfig.ts` | Reusable image optimization utilities |

### Hardcoded Values Replaced

| Category | Count | Examples |
|----------|-------|----------|
| Site names/titles | 10+ | "The Ground Narrative" → `siteConfig.name` |
| API routes | 2 | `/api/newsletter` → `apiRoutes.newsletter` |
| Social URLs | 8 | Facebook, Instagram, YouTube, X, etc. → `socialConfig.*` |
| Navigation routes | 10+ | `/photos`, `/videos`, `/kashmir` → `navRoutes.*` |
| Timeout values | 4 | `2500` → `timeouts.toastDuration` |
| Image dimensions | 15+ | Hardcoded widths/heights → `imageConfig.*` |
| Contact emails | 5 | `groundnarrative@gmail.com` → `contactConfig.*` |

---

## Phase 2: Sanity Query Centralization

### New Centralized Query Module

Created `sanity/lib/queries.ts` with 25+ reusable GROQ queries:

- `TRENDING_QUERY`, `BREAKING_NEWS_QUERY`, `FEATURED_POST_QUERY`
- `IN_DEPTH_QUERY`, `SPECIAL_REPORTS_QUERY`, `OPINION_QUERY`
- `ALL_PHOTO_STORIES_QUERY`, `PHOTO_STORY_BY_SLUG_QUERY`
- `ALL_VIDEO_STORIES_QUERY`, `VIDEO_STORY_BY_SLUG_QUERY`
- `ALL_PODCASTS_QUERY`, `PODCAST_BY_SLUG_QUERY`
- `POST_BY_SLUG_QUERY`, `RELATED_POSTS_QUERY`
- `SEARCH_QUERY`, `SITEMAP_*_QUERY`

### Updated Fetch Functions

All major fetch functions now use centralized queries:
- `getTrending.ts` → uses `TRENDING_QUERY`
- `getBreakingNews.ts` → uses `BREAKING_NEWS_QUERY`
- `getAllFeatured.ts` → uses `FEATURED_POST_QUERY`
- `getAllInDepth.ts` → uses `IN_DEPTH_QUERY`
- `getAllSpecial.ts` → uses `SPECIAL_REPORTS_QUERY`
- `getOpinion.ts` → uses `OPINION_QUERY`
- `getAllPhotoStories.ts` → uses `ALL_PHOTO_STORIES_QUERY`
- `getAllVideoStories.ts` → uses `ALL_VIDEO_STORIES_QUERY`
- `getAllPodcasts.ts` → uses `ALL_PODCASTS_QUERY`
- `getFooterCategories.ts` → uses `FOOTER_CATEGORIES_QUERY`
- `getTags.ts` → uses `ALL_TAGS_QUERY`

---

## Phase 3: Component Updates

### Components Updated to Use Config

| Component | Changes |
|-----------|---------|
| `layout.tsx` | Uses `siteConfig.titleTemplate`, `siteConfig.description` |
| `Footer.tsx` | Uses `siteConfig.name`, `navRoutes.*`, `contactConfig.*`, `externalConfig.*`, `themeColors.*` |
| `HeaderClient.tsx` | Uses `navRoutes.*`, `imageConfig.logo.*`, `siteConfig.name` |
| `NewsletterForm.tsx` | Uses `apiRoutes.newsletter` |
| `SocialIcons.tsx` | Uses `socialConfig.*` for all social URLs |
| `SocialShare.tsx` | Uses `timeouts.toastDuration` |
| `HeroPhoto.tsx` | Uses `timeouts.copyFeedback` |
| `ShareStats.tsx` | Uses `timeouts.copyFeedback` |
| `NewsletterCard.tsx` | Uses `timeouts.newsletterLoading` |

---

## Phase 4: Image Optimization

### New Image Utility (`app/lib/imageConfig.ts`)

Provides helper functions for consistent image handling:

```typescript
// Get optimized Sanity image URL
getOptimizedImageUrl(image, width, height, quality)

// Get responsive sizes string
getResponsiveSizes({ mobile: '100vw', tablet: '50vw', desktop: '33vw' })

// Standard card image props
getCardImageProps(image, 'medium')

// Hero image props (with priority)
getHeroImageProps(image)

// Thumbnail, avatar, gallery, video thumbnail props
getThumbnailImageProps(image)
getAvatarImageProps(image)
getGalleryImageProps(image)
getVideoThumbnailProps(image)
```

### Image Dimension Presets

All image dimensions are now centralized in `config/site.ts`:

```typescript
imageConfig = {
  logo: { width: 200, height: 52 },
  hero: { width: 1920, height: 1080 },
  cardLarge: { width: 800, height: 500 },
  cardMedium: { width: 400, height: 250 },
  cardSmall: { width: 280, height: 160 },
  avatar: { width: 80, height: 80 },
  thumbnail: { width: 200, height: 150 },
  videoThumbnail: { width: 100, height: 56 },
  galleryLarge: { width: 1600, height: 1200 },
  ogImage: { width: 1200, height: 630 },
}
```

---

## Files Removed (From Previous Pass)

| File | Reason |
|------|--------|
| `app/components/PhotoLightbox.tsx` | Never imported |
| `app/styles/videos.css` | Replaced by `cinematic-videos.css` |
| `app/styles/photos.css` | Replaced by `dark-photos.css` |

---

## Configuration Structure (`config/site.ts`)

```typescript
export const siteConfig = { name, description, url, titleTemplate }
export const themeColors = { light, dark, video, photo, status, social }
export const apiRoutes = { newsletter, preview }
export const socialConfig = { facebook, instagram, youtube, x, reddit, pinterest, linkedin }
export const contactConfig = { general, editorial, support, privacy, legal }
export const externalConfig = { developer, sanityCdnHostname }
export const queryLimits = { trending, breaking, relatedPosts, sidebarPosts, photosPage, ... }
export const timeouts = { newsletterDelay, copyFeedback, newsletterLoading, toastDuration }
export const imageConfig = { logo, hero, cardLarge, cardMedium, cardSmall, ... }
export const navRoutes = { home, search, about, contact, privacy, terms, categories, media }
export const sectionTitles = { trending, inDepth, special, opinion, media, ... }
export const videoLabels = { featured, trending, allVideos, upNext, shortVideos, ... }
export const photoLabels = { heroTitle, heroSubtitle, loadMore, new, ... }
export const formLabels = { emailPlaceholder, subscribe, subscribeSuccess, ... }
export const shareLabels = { twitter, facebook, linkedin, copySuccess, ... }
export const footerLabels = { aboutUs, quickLinks, media, categories }
```

---

## Remaining Optimization Opportunities

### High Priority

1. **Static Generation (SSG)**
   - Add `generateStaticParams()` to dynamic routes
   - Implement ISR with `revalidate` constants

2. **Image Optimization**
   - Use `getCardImageProps()`, `getHeroImageProps()` in all pages
   - Add `priority` to above-the-fold images

### Medium Priority

1. **Code Splitting**
   - Dynamic imports for `SocialIcons`, `PhotoGallery`, `VideoPlayer`
   - `lazy` loading for below-fold components

2. **Bundle Size**
   - Audit large dependencies
   - Tree-shake unused imports

### Low Priority

1. **React Optimization**
   - Add `useMemo`, `useCallback` for expensive computations
   - Replace `any` types with proper TypeScript interfaces

---

## Build Verification

Run these commands to verify the build:

```bash
# TypeScript check
npx tsc --noEmit

# ESLint
npx eslint app/ --ext .tsx,.ts

# Build
npm run build

# Dev server
npm run dev
```

---

## Metrics

| Metric | Before | After |
|--------|--------|-------|
| Config-driven values | ~50 hardcoded | Centralized in `config/site.ts` |
| Sanity query definitions | Inline in each file | Centralized in `queries.ts` |
| Image dimension definitions | Scattered across files | Centralized in `imageConfig` |
| API route references | 2 hardcoded | Via `apiRoutes` |
| Social URL references | 8 hardcoded | Via `socialConfig` |
| Navigation route references | 15+ hardcoded | Via `navRoutes` |
| Timeout values | 4 hardcoded | Via `timeouts` |

---

## Date Generated

2025-12-31
