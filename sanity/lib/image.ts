import createImageUrlBuilder from '@sanity/image-url'
import { client } from './sanity'

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
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

  return urlBuilder.url()
}
