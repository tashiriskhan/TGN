export default {
  name: "tag",
  title: "Tag",
  type: "document",
  fields: [
    { name: "title", type: "string", title: "Tag Name" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } }
  ]
};
