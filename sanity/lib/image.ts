import createImageUrlBuilder from '@sanity/image-url'
import { client } from './sanity'

const builder = createImageUrlBuilder(client)

/**
 * Build a Sanity image URL with auto-format negotiation.
 *
 * Wraps the default builder so every call to .url() includes `auto=format`,
 * which tells Sanity's CDN to serve WebP/AVIF to browsers that support it
 * and JPEG/PNG to others. Saves ~30% bandwidth vs always-JPEG with zero
 * code changes at call sites — they still use:
 *   urlFor(image).width(800).height(600).url()
 */
export function urlFor(source: any) {
  const imageBuilder = builder.image(source)
  // Override .url() to always append auto=format
  const originalUrl = imageBuilder.url.bind(imageBuilder)
  imageBuilder.url = () => {
    const url = originalUrl()
    // Sanity URLs already have query params (e.g. ?w=800&h=600); append safely
    const separator = url.includes('?') ? '&' : '?'
    return `${url}${separator}auto=format`
  }
  return imageBuilder
}

// Get blur placeholder from Sanity image asset
export function getBlurPlaceholder(image: any): string | null {
  if (!image?.asset?._ref) return null

  // Sanity stores LQIP (low-quality image placeholder) in metadata
  // LQIP is a base64 encoded tiny blur hash
  if (image.asset.metadata?.lqip) {
    return image.asset.metadata.lqip
  }

  return null
}

// Build image URL with options
export function buildImageUrl(image: any, options: { width?: number; height?: number } = {}) {
  let urlBuilder = builder.image(image)

  if (options.width) {
    urlBuilder = urlBuilder.width(options.width)
  }
  if (options.height) {
    urlBuilder = urlBuilder.height(options.height)
  }

  return urlBuilder.auto('format').url()
}
