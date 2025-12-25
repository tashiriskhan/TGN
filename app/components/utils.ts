export function truncateText(text: string, maxLength: number): string {
  if (!text) return "";
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  return lastSpaceIndex > 0
    ? truncated.slice(0, lastSpaceIndex) + '...'
    : truncated + '...';
}

// Optimized image URL with quality and format settings
export function getOptimizedImageUrl(
  image: any,
  width: number,
  height?: number,
  quality: number = 90
): string {
  if (!image) return "";

  // If using Sanity's urlFor, apply optimization
  if (typeof image === 'object' && image.asset) {
    const builder = (image as any).width(width);
    if (height) builder.height(height);

    return builder
      .quality(quality)
      .format('webp')
      .fit('max')
      .url();
  }

  // Fallback for direct URLs
  return image.url || image;
}
