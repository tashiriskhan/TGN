export default {
  name: "category",
  title: "Category",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Category Name" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } }
  ]
};
