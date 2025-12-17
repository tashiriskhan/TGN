/**
 * Migration Helper for Sanity to Cloudinary
 *
 * This file helps you migrate from Sanity images to Cloudinary
 * Copy your Sanity image URLs, upload them to Cloudinary, and map them here
 */

// Example mapping of Sanity assets to Cloudinary public IDs
// Update this with your actual mappings

export interface ImageMapping {
  sanityAssetUrl: string
  cloudinaryPublicId: string
  alt?: string
}

// Example mappings - UPDATE THESE WITH YOUR ACTUAL MAPPINGS
export const imageMappings: ImageMapping[] = [
  // {
  //   sanityAssetUrl: 'https://cdn.sanity.io/images/bkexk006/production/abcd1234-5678-90ef-ghij.jpg',
  //   cloudinaryPublicId: 'photos/vacation-001',
  //   alt: 'Beach vacation photo'
  // },
  // {
  //   sanityAssetUrl: 'https://cdn.sanity.io/images/bkexk006/production/efgh5678-9012-34ij-klmn.jpg',
  //   cloudinaryPublicId: 'photos/city-skyline',
  //   alt: 'City skyline at night'
  // },
]

/**
 * Get Cloudinary public ID from Sanity asset URL
 */
export function getCloudinaryPublicId(sanityUrl: string): string | null {
  const mapping = imageMappings.find(m => m.sanityAssetUrl === sanityUrl)
  return mapping?.cloudinaryPublicId || null
}

/**
 * Check if an image has been migrated to Cloudinary
 */
export function isImageMigrated(sanityUrl: string): boolean {
  return imageMappings.some(m => m.sanityAssetUrl === sanityUrl)
}

/**
 * Get alt text for an image
 */
export function getImageAlt(sanityUrl: string): string {
  const mapping = imageMappings.find(m => m.sanityAssetUrl === sanityUrl)
  return mapping?.alt || 'Photo'
}

/**
 * Generate Cloudinary URL from Sanity URL (if mapped)
 */
export function getCloudinaryUrlFromSanity(
  sanityUrl: string,
  options: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'webp' | 'jpg' | 'png'
  } = {}
): string | null {
  const publicId = getCloudinaryPublicId(sanityUrl)
  if (!publicId) return null

  const { cloudinaryUrl } = require('./image')
  return cloudinaryUrl(publicId, options)
}

// TODO: Add this to your migration checklist
export const migrationChecklist = [
  '☐ Upload all images from Sanity to Cloudinary',
  '☐ Create mapping in imageMappings array',
  '☐ Test Cloudinary URLs',
  '☐ Update photo listing page to use Cloudinary',
  '☐ Update photo detail pages to use Cloudinary',
  '☐ Remove old Sanity image code',
  '☐ Deploy and test',
]
