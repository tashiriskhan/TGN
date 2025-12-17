// Helper function to generate optimized Cloudinary URLs
export function cloudinaryUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif'
    crop?: 'fill' | 'fit' | 'scale' | 'crop'
    gravity?: 'auto' | 'center' | 'face'
  } = {}
) {
  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options

  // Build transformation string
  const transformations: string[] = []

  // Add format and quality
  if (format) transformations.push(`f_${format}`)
  if (quality) transformations.push(`q_${quality}`)

  // Add dimensions
  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)

  // Add crop and gravity
  if (crop) transformations.push(`c_${crop}`)
  if (gravity) transformations.push(`g_${gravity}`)

  const transformString = transformations.join(',')

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_CLOUD_NAME

  if (!cloudName) {
    console.warn('Cloudinary cloud name not configured')
    return ''
  }

  return `https://res.cloudinary.com/${cloudName}/image/upload/${transformString}/${publicId}`
}

// Predefined image sizes for different contexts
export const imageSizes = {
  // Thumbnail for photo listings
  thumbnail: { width: 280, height: 210, quality: 75 as const },

  // Grid view for photo slug pages
  grid: { width: 600, height: 450, quality: 80 as const },

  // Full size for lightbox
  lightbox: { width: 1200, height: 900, quality: 85 as const },

  // High quality for detailed view
  full: { width: 1920, height: 1080, quality: 90 as const },
}
