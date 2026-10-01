import { getFooterCategories } from "@/sanity/lib/getFooterCategories"
import { getFormattedTodayDate, getFormattedHijriDate } from "@/app/lib/dateHelper"
import HeaderClient from "./HeaderClient"

export default async function Header() {
  const categories = await getFooterCategories()

  // Compute dates on the server so the heavy date logic never ships to the client
  const todayDate = getFormattedTodayDate()
  const hijriDate = getFormattedHijriDate()

  // Pass categories and dates to client component
  return <HeaderClient categories={categories} todayDate={todayDate} hijriDate={hijriDate} />
}
