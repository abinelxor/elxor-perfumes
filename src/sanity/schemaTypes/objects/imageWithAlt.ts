import {defineField, defineType} from 'sanity'

/** Image with hotspot cropping plus the alt text search engines and screen readers need. */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      title: 'Alt text',
      type: 'string',
      description: 'Describe the image in a few words (SEO + accessibility).',
      validation: (rule) =>
        rule.required().warning('Add alt text so the image is accessible and indexable.'),
    }),
    defineField({name: 'caption', title: 'Caption', type: 'string'}),
  ],
})
