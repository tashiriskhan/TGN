export default {
  name: "podcast",
  title: "Podcast",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
    { name: "description", type: "text", title: "Description" },
    { name: "audioUrl", type: "url", title: "Audio URL" },
    { name: "duration", type: "string", title: "Duration" },
    {
      name: "thumbnail",
      type: "image",
      title: "Thumbnail"
    },
    {
      name: "author",
      type: "reference",
      title: "Author",
      to: [{ type: "author" }]
    },
    {
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }]
    },
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "reference", to: [{ type: "tag" }] }]
    },
    {
      name: "publishedAt",
      type: "datetime",
      title: "Published At"
    }
  ]
};
