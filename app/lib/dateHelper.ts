import moment from 'moment-hijri'

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

/**
 * Format today's Hijri date
 * Example: "17 Jumada Al-Akhirah 1447 AH"
 */
export function getFormattedHijriDate(): string {
  const hijriMonths = [
    'Muharram', 'Safar', "Rabi' Al-Awwal", 'Rabi\' Al-Thani',
    'Jumada Al-Awwal', 'Jumada Al-Thani', 'Rajab', 'Sha\'ban',
    'Ramadan', 'Shawwal', 'Dhu Al-Qi\'dah', 'Dhu Al-Hijjah'
  ]

  const day = moment().iDate()
  const monthIndex = moment().iMonth()
  const year = moment().iYear()

  return `${day} ${hijriMonths[monthIndex]} ${year} AH`
}
