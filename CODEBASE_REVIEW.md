# Codebase Review & Refactoring Summary

## Overview
This document summarizes the refactoring and hygiene changes applied to the Next.js/React news site.

---

## Files Removed (Unused/Duplicated)

| File | Reason |
|------|--------|
| `app/components/PhotoLightbox.tsx` | Never imported - functionality exists in PhotoGallery |
| `app/styles/videos.css` | Legacy file - replaced by `cinematic-videos.css` |
| `app/styles/photos.css` | Legacy file - replaced by `dark-photos.css` |

---

## Code Consolidation

### 1. Duplicate `truncateText` Function
**Before:** Defined inline in 3 files
- `app/components/utils.ts` (canonical)
- `app/page.tsx` (duplicate)
- `app/story/[slug]/page.tsx` (duplicate)

**After:** All files now import from `@/app/components/utils`

### 2. Duplicate `urlFor` Helper
**Before:** `app/photos/[slug]/PhotographerBio.tsx` had local implementation
**After:** Imports from `@/sanity/lib/image`

---

## Unused Import Cleanup

| File | Removed |
|------|---------|
| `app/components/Header.tsx` | Unused `Link`, `Image`, `getFormattedTodayDate`, `getFormattedHijriDate` |
| `app/components/NewsletterForm.tsx` | Unused `error` variable in catch block |
| `app/author/[slug]/page.tsx` | Unused `timeAgo` import |

---

## TypeScript Error Fixes

| File | Issue | Fix |
|------|-------|-----|
| `app/photos/page.tsx` | `timeAgo(new Date())` expected string | Changed to `timeAgo(new Date().toISOString())` |
| `app/videos/[slug]/page.tsx` | Duplicate `allow` attribute in iframe | Removed duplicate |

---

## Low-Priority Items (Not Changed)

### Newsletter Components
`NewsletterForm.tsx` and `NewsletterCard.tsx` serve different visual purposes:
- Compact sidebar form vs. full card with background image
- Consolidation would require significant CSS refactoring with breaking change risk

### TypeScript `any` Types
Multiple files use `any` types (RightSidebar, Footer, etc.). These should be replaced with proper types but require careful type definition work.

### React Effect Warnings
`SocialShare.tsx` and `TableOfContents.tsx` have synchronous `setState` in effects. These are performance concerns but changing them requires careful React refactoring.

---

## Remaining Test Areas

1. **Photo pages** - Verify hero CTA, gallery, and lightbox still work
2. **Video pages** - Verify video embedding works (YouTube/Vimeo/native)
3. **Newsletter** - Test form submission API endpoint
4. **Social sharing** - Verify share buttons work on articles and photo stories
5. **Search/Filtering** - Verify photo and tag filtering works

---

## Build Commands

```bash
# TypeScript check
npx tsc --noEmit

# ESLint
npx eslint app/ --ext .tsx,.ts

# Dev server
npm run dev
```

---

## Date Generated
2025-12-31
