export default {
  name: 'author',
  title: 'Author',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists: [],
        },
      ],
    },
    {
      name: 'expertise',
      title: 'Expertise / Beat',
      type: 'string',
      description: 'Areas of expertise or coverage beat (e.g., Geopolitics, Visual Journalism, Conflict Reporting)',
    },
    {
      name: 'twitter',
      title: 'Twitter / X Profile URL',
      type: 'url',
    },
    {
      name: 'instagram',
      title: 'Instagram Profile URL',
      type: 'url',
    },
    {
      name: 'linkedin',
      title: 'LinkedIn Profile URL',
      type: 'url',
    },
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
}
