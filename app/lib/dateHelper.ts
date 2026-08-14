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

const hijriMonths = [
  'Muharram', 'Safar', "Rabi' Al-Awwal", 'Rabi\' Al-Thani',
  'Jumada Al-Awwal', 'Jumada Al-Thani', 'Rajab', 'Sha\'ban',
  'Ramadan', 'Shawwal', 'Dhu Al-Qi\'dah', 'Dhu Al-Hijjah'
]

/**
 * Format today's Hijri date using the native Intl Islamic (tabular) calendar.
 * No external dependencies — replaces the previous moment-hijri implementation.
 * Example: "17 Jumada Al-Akhirah 1447 AH"
 */
export function getFormattedHijriDate(): string {
  const parts = new Intl.DateTimeFormat('en-US-u-ca-islamic-umalqura-nu-latn', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  }).formatToParts(new Date())

  const day = Number(parts.find(p => p.type === 'day')?.value || 1)
  const month = Number(parts.find(p => p.type === 'month')?.value || 1)
  const year = Number(parts.find(p => p.type === 'year')?.value || new Date().getFullYear())

  return `${day} ${hijriMonths[month - 1] || ''} ${year} AH`
}
