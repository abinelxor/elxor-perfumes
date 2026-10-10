import {defineField, defineType} from 'sanity'

/** Reusable SEO block: meta tags, Open Graph, indexing and JSON-LD schema. */
export const seo = defineType({
  name: 'seo',
  title: 'SEO & Social',
  type: 'object',
  options: {collapsible: true, collapsed: false},
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta title',
      type: 'string',
      description: 'Shown in Google results and the browser tab. Aim for 50-60 characters.',
      validation: (rule) =>
        rule.max(70).warning('Titles over ~60 characters may be cut off in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta description',
      type: 'text',
      rows: 3,
      description: 'Shown under the title in Google results. Aim for 120-160 characters.',
      validation: (rule) =>
        rule.max(180).warning('Descriptions over ~160 characters may be cut off.'),
    }),
    defineField({
      name: 'keywords',
      title: 'Meta keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'canonicalUrl',
      title: 'Canonical URL',
      type: 'url',
      description: 'Leave empty to use the page’s own URL.',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
    defineField({
      name: 'ogTitle',
      title: 'Open Graph title',
      type: 'string',
      description:
        'Title used when the page is shared (WhatsApp, Facebook, LinkedIn). Falls back to the meta title.',
    }),
    defineField({
      name: 'ogDescription',
      title: 'Open Graph description',
      type: 'text',
      rows: 2,
      description: 'Falls back to the meta description.',
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph image',
      type: 'image',
      options: {hotspot: true},
      description: 'Recommended 1200 x 630 px.',
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from search engines (noindex)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'structuredData',
      title: 'Schema markup (JSON-LD)',
      type: 'text',
      rows: 10,
      description:
        'Optional. Paste JSON-LD without the <script> tags, e.g. FAQPage, Product or Organization. Must be valid JSON.',
      validation: (rule) =>
        rule.custom((value) => {
          if (!value || typeof value !== 'string' || !value.trim()) return true
          try {
            JSON.parse(value)
            return true
          } catch {
            return 'This is not valid JSON.'
          }
        }),
    }),
  ],
})
