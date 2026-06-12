import createImageUrlBuilder from '@sanity/image-url'
import { client } from './sanity'

const builder = createImageUrlBuilder(client)

/**
 * Build a Sanity image URL with auto-format negotiation.
 *
 * Overrides the builder prototype's .url() method to always append
 * `auto=format`, which tells Sanity's CDN to serve WebP/AVIF to browsers
 * that support them and JPEG/PNG to others. Saves ~30% bandwidth vs
 * always-JPEG with zero code changes at call sites — they still use:
 *   urlFor(image).width(800).height(600).url()
 *
 * Why prototype instead of instance: Sanity's builder uses a prototype
 * method, so instance-level overrides (imageBuilder.url = ...) are
 * shadowed by the original prototype method. Mutating the prototype once
 * at module load applies to every builder created afterwards.
 */
const sampleBuilder = builder.image({ _type: 'image', asset: { _ref: 'placeholder' } })
const builderProto = Object.getPrototypeOf(sampleBuilder)
const originalUrlMethod = builderProto.url

builderProto.url = function (this: any) {
  const url = originalUrlMethod.call(this)
  const separator = url.includes('?') ? '&' : '?'
  return `${url}${separator}auto=format`
}

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

  return urlBuilder.auto('format').url()
}
