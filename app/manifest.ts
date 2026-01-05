import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'The Ground Narrative',
    short_name: 'Ground Narrative',
    description: 'Independent journalism covering Kashmir, India, and the world with depth and perspective.',
    start_url: '/',
    display: 'standalone',
    background_color: '#fafafa',
    theme_color: '#bb1919',
    orientation: 'portrait-primary',
    icons: [
      {
        src: '/logo.svg',
        sizes: 'any',
        type: 'image/svg+xml',
        purpose: 'maskable',
      },
    ],
    categories: ['news', 'politics', 'media'],
    lang: 'en-US',
  }
}