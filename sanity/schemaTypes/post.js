export default {
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    },
    {
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    },
    {
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    },

    // Homepage section flags
    {
      name: 'isBreaking',
      title: 'Breaking News',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isFeatured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isTrending',
      title: 'Trending',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isOpinion',
      title: 'Opinion',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isInDepth',
      title: 'In Depth',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'isSpecial',
      title: 'Special',
      type: 'boolean',
      initialValue: false,
    },

    // AI-generated scoring fields
    {
      name: 'importanceScore',
      title: 'Importance Score (1-10)',
      type: 'number',
      description: 'AI-generated score indicating global significance.',
      initialValue: 0,
    },
    {
      name: 'geopoliticalImpact',
      title: 'Geopolitical Impact (1-10)',
      type: 'number',
      description: 'AI-generated score for impact on global policy/relations.',
      initialValue: 0,
    },
    {
      name: 'narrativeConflictScore',
      title: 'Narrative Conflict Score (1-10)',
      type: 'number',
      description: 'Measures the difference in framing between multiple sources.',
      initialValue: 0,
    },
    {
      name: 'controversyLevel',
      title: 'Controversy Level (1-10)',
      type: 'number',
      initialValue: 0,
    },
    {
      name: 'urgencyScore',
      title: 'Urgency Score (1-10)',
      type: 'number',
      initialValue: 0,
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
}
