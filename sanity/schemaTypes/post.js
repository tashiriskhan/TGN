export default {
  name: "post",
  type: "document",
  title: "News Post",
  fields: [
    { name: "title", type: "string", title: "Title" },
    { name: "slug", type: "slug", title: "Slug", options: { source: "title" } },
    { name: "content", type: "text", title: "Content" },
    { name: "image", type: "image", title: "Feature Image" },

      //Author
{
  name: "author",
  type: "reference",
  title: "Author",
  to: [{ type: "author" }]
},

    // NEW: One category per post
    {
      name: "category",
      type: "reference",
      title: "Category",
      to: [{ type: "category" }]
    },

    // NEW: Multiple tags per post
    {
      name: "tags",
      type: "array",
      title: "Tags",
      of: [{ type: "reference", to: [{ type: "tag" }] }]
    },
  // Feature
    {
  name: "isFeatured",
  title: "Feature This Post",
  type: "boolean",
  description: "If true, this post becomes the hero post"
},

  // Breaking News
  {
  name: "isBreaking",
  type: "boolean",
  title: "Breaking News",
  description: "If true, this post appears in Breaking News section"
},
   // Trending
{
  name: "isTrending",
  type: "boolean",
  title: "Trending Post",
  description: "If true, this post appears in the Trending section."
},
   //Opinion
   {
  name: "isOpinion",
  type: "boolean",
  title: "Opinion Article",
  description: "If true, this post appears in the Opinion section."
},
 //Special
 {
  name: "isSpecial",
  type: "boolean",
  title: "Special Story",
  description: "If true, this post appears in the Special block."
},
  //Right Column
  {
  name: "isRightColumn",
  type: "boolean",
  title: "Right Column Story",
  description: "If true, this post appears in the right-hand sidebar."
},
{
  name: "specialTag",
  type: "string",
  title: "Special Tag",
  description: "Label shown above title (optional)."
},
{
  name: "subtitle",
  type: "string",
  title: "Short Subtitle",
  description: "Displayed as the small text under the title."
},

 

 
     //Time
    {
      name: "publishedAt",
      type: "datetime",
      title: "Published At"
    }

  ]
};
