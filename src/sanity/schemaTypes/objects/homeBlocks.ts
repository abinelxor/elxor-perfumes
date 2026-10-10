import {defineField, defineType} from 'sanity'

const titleHelp =
  'Words shown in white. Press Enter for a new line. Leave empty to keep the built-in text.'
const goldHelp = 'Words shown in gold. Press Enter for a new line.'

/** Eyebrow + two-tone headline (+ optional lead paragraph). Used for section headers. */
export const sectionHeader = defineType({
  name: 'sectionHeader',
  title: 'Section header',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label above the title', type: 'string'}),
    defineField({name: 'titleWhite', title: 'Title (white part)', type: 'text', rows: 2, description: titleHelp}),
    defineField({name: 'titleGold', title: 'Title (gold part)', type: 'text', rows: 2, description: goldHelp}),
    defineField({name: 'lead', title: 'Intro paragraph (optional)', type: 'text', rows: 3}),
  ],
  preview: {
    select: {a: 'titleWhite', b: 'titleGold', eyebrow: 'eyebrow'},
    prepare: ({a, b, eyebrow}) => ({title: [a, b].filter(Boolean).join(' ') || 'Section header', subtitle: eyebrow}),
  },
})

/** Image beside a block of text (Philosophy / Experience). */
export const splitSection = defineType({
  name: 'splitSection',
  title: 'Image + text section',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label above the title', type: 'string'}),
    defineField({name: 'titleWhite', title: 'Title (white part)', type: 'text', rows: 2, description: titleHelp}),
    defineField({name: 'titleGold', title: 'Title (gold part)', type: 'text', rows: 2, description: goldHelp}),
    defineField({name: 'text', title: 'Paragraph', type: 'text', rows: 4}),
    defineField({name: 'buttonLabel', title: 'Button text', type: 'string'}),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'imageWithAlt',
      description:
        'Bright studio photo. The side next to the text fades into the page, so keep the bottle away from that edge.',
    }),
  ],
  preview: {
    select: {a: 'titleWhite', b: 'titleGold', media: 'image'},
    prepare: ({a, b, media}) => ({title: [a, b].filter(Boolean).join(' ') || 'Image + text', media}),
  },
})

/** One scene of the opening hero animation. */
export const heroChapter = defineType({
  name: 'heroChapter',
  title: 'Hero scene',
  type: 'object',
  fields: [
    defineField({name: 'eyebrow', title: 'Small label', type: 'string'}),
    defineField({name: 'titleWhite', title: 'Title (white part)', type: 'text', rows: 2, description: titleHelp}),
    defineField({name: 'titleGold', title: 'Title (gold part)', type: 'text', rows: 2, description: goldHelp}),
    defineField({name: 'body', title: 'Supporting line', type: 'text', rows: 2}),
    defineField({
      name: 'buttonLabel',
      title: 'Button text',
      type: 'string',
      description: 'Only the last scene shows a button.',
    }),
  ],
  preview: {
    select: {a: 'titleWhite', b: 'titleGold', eyebrow: 'eyebrow'},
    prepare: ({a, b, eyebrow}) => ({title: [a, b].filter(Boolean).join(' ') || 'Hero scene', subtitle: eyebrow}),
  },
})

export const valueItem = defineType({
  name: 'valueItem',
  title: 'Value',
  type: 'object',
  fields: [
    defineField({name: 'title', title: 'Title', type: 'string', validation: (rule) => rule.required()}),
    defineField({name: 'text', title: 'Short text', type: 'text', rows: 2}),
  ],
  preview: {select: {title: 'title', subtitle: 'text'}},
})
