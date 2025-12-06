/**
 * Calculate estimated reading time for an article
 * @param content - The article content
 * @param wordsPerMinute - Average reading speed (default: 200 WPM)
 * @returns Formatted reading time string (e.g., "3 min read")
 */
export function calculateReadingTime(content: string, wordsPerMinute: number = 200): string {
  if (!content) return "1 min read"

  // Remove HTML tags if any
  const textContent = content.replace(/<[^>]*>/g, '')

  // Count words
  const wordCount = textContent.trim().split(/\s+/).length

  // Calculate reading time in minutes
  const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute)

  return `${readingTimeMinutes} min read`
}
