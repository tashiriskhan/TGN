export default {
  name: 'videoStory',
  title: 'Video Story',
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
      name: 'isShort',
      title: 'Short',
      type: 'boolean',
      initialValue: false,
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
    },
    {
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoUrl',
      title: 'Video URL',
      type: 'url',
      description: 'URL to the video file (MP4, YouTube, Vimeo, etc.)',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'videoType',
      title: 'Video Type',
      type: 'string',
      options: {
        list: [
          { title: 'MP4 File', value: 'mp4' },
          { title: 'YouTube', value: 'youtube' },
          { title: 'Vimeo', value: 'vimeo' },
          { title: 'Other', value: 'other' },
        ],
      },
      initialValue: 'mp4',
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
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'thumbnail',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
}
