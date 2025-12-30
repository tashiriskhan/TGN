/**
 * Image Configuration Utility
 * Provides consistent image dimension presets and optimization settings
 */

import { imageConfig } from '@/config/site'

/**
 * Get optimized Sanity image URL with dimensions
 */
export function getOptimizedImageUrl(
  image: any,
  width: number,
  height?: number,
  quality: number = 90
): string {
  if (!image) return ''

  // If using Sanity's urlFor, apply optimization
  if (typeof image === 'object' && image.asset) {
    const builder = (image as any).width(width)
    if (height) builder.height(height)

    return builder
      .quality(quality)
      .format('webp')
      .fit('max')
      .url()
  }

  // Fallback for direct URLs
  return image.url || image
}

/**
 * Get responsive sizes string for Next.js Image
 */
export function getResponsiveSizes(breakpoints: {
  mobile?: string
  tablet?: string
  desktop?: string
} = {}): string {
  const { mobile = '100vw', tablet = '50vw', desktop = '33vw' } = breakpoints
  return `(max-width: 640px) ${mobile}, (max-width: 1024px) ${tablet}, ${desktop}`
}

/**
 * Standard card image props for Next.js Image
 */
export function getCardImageProps(image: any, size: 'small' | 'medium' | 'large' = 'medium') {
  const dimensions = {
    small: imageConfig.cardSmall,
    medium: imageConfig.cardMedium,
    large: imageConfig.cardLarge,
  }[size]

  return {
    src: getOptimizedImageUrl(image, dimensions.width, dimensions.height),
    width: dimensions.width,
    height: dimensions.height,
    sizes: getResponsiveSizes({ mobile: '100vw', tablet: '50vw', desktop: '33vw' }),
    alt: 'Article image',
    style: { objectFit: 'cover' as const },
  }
}

/**
 * Hero image props for Next.js Image
 */
export function getHeroImageProps(image: any) {
  return {
    src: getOptimizedImageUrl(image, imageConfig.hero.width, imageConfig.hero.height),
    width: imageConfig.hero.width,
    height: imageConfig.hero.height,
    sizes: '100vw',
    alt: 'Hero image',
    priority: true,
    style: { objectFit: 'cover' as const },
  }
}

/**
 * Thumbnail image props for Next.js Image
 */
export function getThumbnailImageProps(image: any) {
  return {
    src: getOptimizedImageUrl(image, imageConfig.thumbnail.width, imageConfig.thumbnail.height),
    width: imageConfig.thumbnail.width,
    height: imageConfig.thumbnail.height,
    sizes: '(max-width: 768px) 100vw, 200px',
    alt: 'Thumbnail',
    style: { objectFit: 'cover' as const },
  }
}

/**
 * Avatar image props for Next.js Image
 */
export function getAvatarImageProps(image: any, size: 'small' | 'medium' = 'medium') {
  const dimensions = size === 'small' ? imageConfig.avatarSm : imageConfig.avatar
  return {
    src: getOptimizedImageUrl(image, dimensions.width, dimensions.height),
    width: dimensions.width,
    height: dimensions.height,
    sizes: '80px',
    alt: 'Avatar',
    style: { objectFit: 'cover' as const, borderRadius: '50%' as const },
  }
}

/**
 * Gallery image props for Next.js Image
 */
export function getGalleryImageProps(image: any) {
  return {
    src: getOptimizedImageUrl(image, imageConfig.galleryLarge.width, imageConfig.galleryLarge.height),
    width: imageConfig.galleryLarge.width,
    height: imageConfig.galleryLarge.height,
    sizes: '(max-width: 768px) 100vw, 1600px',
    alt: 'Gallery image',
    style: { objectFit: 'contain' as const },
  }
}

/**
 * Video thumbnail props for Next.js Image
 */
export function getVideoThumbnailProps(image: any) {
  return {
    src: getOptimizedImageUrl(image, imageConfig.videoThumbnail.width, imageConfig.videoThumbnail.height),
    width: imageConfig.videoThumbnail.width,
    height: imageConfig.videoThumbnail.height,
    sizes: '100px',
    alt: 'Video thumbnail',
    style: { objectFit: 'cover' as const },
  }
}

/**
 * Open Graph image props for SEO
 */
export function getOgImageProps(image: any) {
  return {
    src: getOptimizedImageUrl(image, imageConfig.ogImage.width, imageConfig.ogImage.height),
    width: imageConfig.ogImage.width,
    height: imageConfig.ogImage.height,
    alt: 'Open Graph image',
  }
}
