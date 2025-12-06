/**
 * Format today's date in a human-readable format
 * Example: "Saturday, 6 December 2025"
 */
export function getFormattedTodayDate(): string {
  const today = new Date()

  const dayName = today.toLocaleDateString('en-US', { weekday: 'long' })
  const dayNumber = today.getDate()
  const monthName = today.toLocaleDateString('en-US', { month: 'long' })
  const year = today.getFullYear()

  return `${dayName}, ${dayNumber} ${monthName} ${year}`
}
