import {defineArrayMember, defineField, defineType} from 'sanity'

/** Singleton: site-wide defaults, contact details and the home-page FAQ. */
export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site settings',
  type: 'document',
  groups: [
    {name: 'general', title: 'General', default: true},
    {name: 'contact', title: 'Contact'},
    {name: 'faq', title: 'Home FAQ'},
    {name: 'seo', title: 'Default SEO'},
  ],
  fields: [
    defineField({
      name: 'siteName',
      title: 'Site name',
      type: 'string',
      group: 'general',
      initialValue: 'ELXOR Perfumes',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
      group: 'general',
      initialValue: 'https://www.elxorperfumes.com',
    }),
    defineField({name: 'logo', title: 'Logo', type: 'imageWithAlt', group: 'general'}),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      group: 'contact',
      initialValue: 'info@elxorperfumes.com',
    }),
    defineField({name: 'phone', title: 'Phone', type: 'string', group: 'contact'}),
    defineField({name: 'whatsapp', title: 'WhatsApp number', type: 'string', group: 'contact'}),
    defineField({name: 'address', title: 'Address', type: 'string', group: 'contact'}),
    defineField({
      name: 'socialLinks',
      title: 'Social links',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'socialLink',
          fields: [
            defineField({name: 'platform', title: 'Platform', type: 'string'}),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (rule) => rule.uri({scheme: ['https']}),
            }),
          ],
          preview: {select: {title: 'platform', subtitle: 'url'}},
        }),
      ],
    }),

    defineField({
      name: 'faqs',
      title: 'Home page FAQs',
      type: 'array',
      group: 'faq',
      of: [defineArrayMember({type: 'faqItem'})],
    }),

    defineField({
      name: 'defaultSeo',
      title: 'Default SEO & Social',
      type: 'seo',
      group: 'seo',
      description:
        'Used for the home page and as a fallback for pages without their own SEO.',
    }),
  ],
  preview: {prepare: () => ({title: 'Site settings'})},
})
