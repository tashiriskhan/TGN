import { getFooterCategories } from "@/sanity/lib/getFooterCategories"
import HeaderClient from "./HeaderClient"

export default async function Header() {
  const categories = await getFooterCategories()

  // Pass categories to client component
  return <HeaderClient categories={categories} />
}
