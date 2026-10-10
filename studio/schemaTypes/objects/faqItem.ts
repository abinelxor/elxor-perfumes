import {defineField, defineType} from 'sanity'

export const faqItem = defineType({
  name: 'faqItem',
  title: 'FAQ',
  type: 'object',
  fields: [
    defineField({
      name: 'question',
      title: 'Question',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'answer',
      title: 'Answer',
      type: 'text',
      rows: 4,
      description:
        'Plain text. Used both on the page and in the FAQPage schema, so the two always match.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {select: {title: 'question', subtitle: 'answer'}},
})
