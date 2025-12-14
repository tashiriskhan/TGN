import Link from "next/link"
import Image from "next/image"
import { getFooterCategories } from "@/sanity/lib/getFooterCategories"
import { getFormattedTodayDate, getFormattedHijriDate } from "@/app/lib/dateHelper"
import HeaderClient from "./HeaderClient"

export default async function Header() {
  const categories = await getFooterCategories()

  // Pass categories to client component
  return <HeaderClient categories={categories} />
}
