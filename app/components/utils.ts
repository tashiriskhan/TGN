import type { SanityImage } from '@/app/types';

export function truncateText(text: string, maxLength: number): string {
  if (!text || typeof text !== 'string') return '';
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex > 0
    ? truncated.slice(0, lastSpaceIndex) + '...'
    : truncated + '...';
}

// Optimized image URL with quality and format settings
export function getOptimizedImageUrl(
  image: SanityImage | null | undefined,
  width: number,
  height?: number,
  quality: number = 90
): string {
  if (!image) return '';

  // Fallback for direct URLs
  if ('url' in image) {
    return (image as { url?: string }).url || '';
  }

  return '';
}
