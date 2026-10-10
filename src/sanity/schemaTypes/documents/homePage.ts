import {defineArrayMember, defineField, defineType} from 'sanity'

/**
 * Singleton: every editable piece of text and imagery on the home page.
 * Anything left empty falls back to the website's built-in text, so the page never breaks.
 */
export const homePage = defineType({
  name: 'homePage',
  title: 'Home page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero', default: true},
    {name: 'intro', title: 'Brand statement'},
    {name: 'collection', title: 'Collection'},
    {name: 'about', title: 'Philosophy, values, experience'},
    {name: 'faqContact', title: 'FAQ & contact'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    // ---- Hero
    defineField({
      name: 'heroChapters',
      title: 'Hero scenes',
      type: 'array',
      group: 'hero',
      description: 'The four scenes of the opening animation, in order.',
      of: [defineArrayMember({type: 'heroChapter'})],
      validation: (rule) => rule.length(4).warning('The hero animation is built for exactly 4 scenes.'),
    }),

    // ---- Brand statement
    defineField({
      name: 'statementText',
      title: 'Big statement (first part)',
      type: 'string',
      group: 'intro',
      description: 'Words light up as you scroll. "ELXOR" is shown in the brand font.',
    }),
    defineField({
      name: 'statementGold',
      title: 'Big statement (gold last word)',
      type: 'string',
      group: 'intro',
    }),
    defineField({
      name: 'statementNarrative',
      title: 'Brand story paragraph',
      type: 'array',
      group: 'intro',
      description: 'Select text to make it bold, italic or brand-font.',
      of: [
        defineArrayMember({
          type: 'block',
          styles: [{title: 'Normal', value: 'normal'}],
          lists: [],
          marks: {
            annotations: [],
            decorators: [
              {title: 'Bold', value: 'strong'},
              {title: 'Gold italic', value: 'em'},
              {title: 'Brand font', value: 'brand'},
            ],
          },
        }),
      ],
    }),

    // ---- Collection
    defineField({name: 'collectionHeader', title: 'Collection header', type: 'sectionHeader', group: 'collection'}),
    defineField({
      name: 'finale',
      title: 'Closing of the collection animation',
      type: 'object',
      group: 'collection',
      fields: [
        defineField({name: 'titleWhite', title: 'Title (white part)', type: 'text', rows: 2}),
        defineField({name: 'titleGold', title: 'Title (gold part)', type: 'text', rows: 2}),
        defineField({name: 'buttonLabel', title: 'Button text', type: 'string'}),
        defineField({name: 'noteOne', title: 'Handwritten note beside bottle 1', type: 'string'}),
        defineField({name: 'noteTwo', title: 'Handwritten note beside bottle 2', type: 'string'}),
      ],
    }),
    defineField({
      name: 'marqueeText',
      title: 'Scrolling banner text',
      type: 'string',
      group: 'collection',
      description: 'Repeats across the moving banner.',
    }),

    // ---- Philosophy / values / experience
    defineField({name: 'philosophy', title: 'Philosophy section', type: 'splitSection', group: 'about'}),
    defineField({
      name: 'valuesHeader',
      title: 'Values header',
      type: 'sectionHeader',
      group: 'about',
    }),
    defineField({
      name: 'values',
      title: 'Values',
      type: 'array',
      group: 'about',
      of: [defineArrayMember({type: 'valueItem'})],
      validation: (rule) => rule.max(4).warning('The layout shows four values.'),
    }),
    defineField({name: 'experience', title: 'Experience section', type: 'splitSection', group: 'about'}),

    // ---- FAQ & contact
    defineField({
      name: 'faqHeader',
      title: 'FAQ header',
      type: 'sectionHeader',
      group: 'faqContact',
      description: 'The questions themselves are edited in Site settings → Home FAQ.',
    }),
    defineField({
      name: 'contact',
      title: 'Contact section',
      type: 'object',
      group: 'faqContact',
      fields: [
        defineField({name: 'title', title: 'Title', type: 'string'}),
        defineField({name: 'submitLabel', title: 'Send button text', type: 'string'}),
        defineField({name: 'successTitle', title: 'Thank-you title', type: 'string'}),
        defineField({name: 'successText', title: 'Thank-you message', type: 'text', rows: 3}),
      ],
    }),

    // ---- Footer
    defineField({name: 'footerHeading', title: 'Footer heading', type: 'string', group: 'footer'}),
    defineField({name: 'footerText', title: 'Footer paragraph', type: 'text', rows: 3, group: 'footer'}),
  ],
  preview: {prepare: () => ({title: 'Home page'})},
})
