import {defineArrayMember, defineField, defineType} from 'sanity'

/** A standalone page (About, Policy, Landing page...) with its own slug and SEO. */
export const page = defineType({
  name: 'page',
  title: 'Page',
  type: 'document',
  groups: [
    {name: 'content', title: 'Content', default: true},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Page title',
      type: 'string',
      group: 'content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (URL)',
      type: 'slug',
      group: 'content',
      options: {source: 'title', maxLength: 96},
      description: 'The page address, e.g. "about" becomes /about',
      validation: (rule) => rule.required(),
    }),
    defineField({name: 'heroImage', title: 'Hero image', type: 'imageWithAlt', group: 'content'}),
    defineField({name: 'heading', title: 'Heading', type: 'string', group: 'content'}),
    defineField({name: 'intro', title: 'Intro text', type: 'text', rows: 3, group: 'content'}),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'block'}), defineArrayMember({type: 'imageWithAlt'})],
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      group: 'content',
      of: [defineArrayMember({type: 'faqItem'})],
      description: 'Shown on the page and usable for FAQPage schema.',
    }),
    defineField({name: 'seo', title: 'SEO & Social', type: 'seo', group: 'seo'}),
  ],
  preview: {
    select: {title: 'title', slug: 'slug.current', media: 'heroImage'},
    prepare: ({title, slug, media}) => ({
      title,
      subtitle: slug ? `/${slug}` : 'No slug yet',
      media,
    }),
  },
})
