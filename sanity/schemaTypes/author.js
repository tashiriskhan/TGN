export default {
  name: "author",
  title: "Author",
  type: "document",
  fields: [
    { name: "name", type: "string", title: "Full Name" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "name" } },
    { name: "bio", type: "text", title: "Short Bio" },
    { name: "image", type: "image", title: "Photo" },
    { name: "twitter", type: "url", title: "Twitter Profile" },
    { name: "instagram", type: "url", title: "Instagram Profile" }
  ]
}
