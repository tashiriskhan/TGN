export default {
  name: "photoStory",
  title: "Photo Story",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
    { name: "description", type: "text", title: "Description" },
    {
      name: "images",
      type: "array",
      title: "Images",
      of: [{ type: "image" }]
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
