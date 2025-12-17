'use client'

import Image, { ImageProps } from 'next/image'
import { cloudinaryUrl } from '@/lib/cloudinary/image'

interface CloudinaryImageProps extends Omit<ImageProps, 'src'> {
  publicId: string
  size?: 'thumbnail' | 'grid' | 'lightbox' | 'full'
  transformations?: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif'
  }
}

export default function CloudinaryImage({
  publicId,
  size = 'thumbnail',
  transformations = {},
  alt,
  ...props
}: CloudinaryImageProps) {
  // Get predefined size or use custom transformations
  const sizeConfig = {
    thumbnail: { width: 280, height: 210, quality: 75 },
    grid: { width: 600, height: 450, quality: 80 },
    lightbox: { width: 1200, height: 900, quality: 85 },
    full: { width: 1920, height: 1080, quality: 90 },
  }[size]

  const finalTransformations = {
    ...sizeConfig,
    ...transformations,
  }

  const src = cloudinaryUrl(publicId, {
    ...finalTransformations,
    format: 'auto',
    quality: 'auto',
  })

  return (
    <Image
      src={src}
      alt={alt}
      {...props}
    />
  )
}
