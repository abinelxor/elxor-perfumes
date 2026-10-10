import {defineArrayMember, defineField, defineType} from 'sanity'

// Show the page-targeting fields only when "Specific pages only" is chosen
const isPagesScope = ({document}: {document?: unknown}) =>
  (document as {scope?: string} | undefined)?.scope !== 'pages'

/**
 * Custom code injected into the website: analytics, pixels, verification tags,
 * chat widgets, extra CSS... Choose WHERE in the HTML it goes and WHICH pages it runs on.
 */
export const codeSnippet = defineType({
  name: 'codeSnippet',
  title: 'Custom code (head / body)',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Name',
      type: 'string',
      description: 'For your reference, e.g. "Google Tag Manager" or "Meta Pixel".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
      description: 'Switch off to stop using this code without deleting it.',
    }),
    defineField({
      name: 'position',
      title: 'Where to add the code',
      type: 'string',
      initialValue: 'headEnd',
      options: {
        layout: 'radio',
        list: [
          {title: '<head> – start (right after <head> opens)', value: 'headStart'},
          {title: '<head> – end (right before </head>)', value: 'headEnd'},
          {title: '<body> – start (right after <body> opens)', value: 'bodyStart'},
          {title: '<body> – end (right before </body>)', value: 'bodyEnd'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'code',
      title: 'Code',
      type: 'text',
      rows: 14,
      description:
        'Paste the full snippet including its <script>, <style>, <meta>, <link> or <noscript> tags. ' +
        'This code runs on every visitor’s browser: only paste code from sources you trust.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'scope',
      title: 'Where should it run?',
      type: 'string',
      initialValue: 'site',
      options: {
        layout: 'radio',
        list: [
          {title: 'Entire website (every page)', value: 'site'},
          {title: 'Specific pages only (one or several)', value: 'pages'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'includeHome',
      title: 'Include the home page',
      type: 'boolean',
      initialValue: false,
      hidden: isPagesScope,
    }),
    defineField({
      name: 'pages',
      title: 'Pages and products',
      type: 'array',
      description: 'Pick one or more pages / products created in this Studio.',
      of: [defineArrayMember({type: 'reference', to: [{type: 'page'}, {type: 'product'}]})],
      hidden: isPagesScope,
    }),
    defineField({
      name: 'extraPaths',
      title: 'Other paths (optional)',
      type: 'array',
      description:
        'Any other URL paths, e.g. /thank-you. End with * to match everything below it, e.g. /blog/*',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
      hidden: isPagesScope,
      validation: (rule) =>
        rule.custom((paths) =>
          !paths || (paths as string[]).every((p) => p.startsWith('/'))
            ? true
            : 'Each path must start with "/", e.g. /about',
        ),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers are added first when several snippets share a position.',
    }),
    defineField({name: 'notes', title: 'Internal notes', type: 'text', rows: 2}),
  ],
  validation: (rule) =>
    rule.custom((doc) => {
      const d = doc as
        | {scope?: string; includeHome?: boolean; pages?: unknown[]; extraPaths?: string[]}
        | undefined
      if (d?.scope === 'pages' && !d.includeHome && !d.pages?.length && !d.extraPaths?.length) {
        return 'Choose at least one page, the home page, or a path.'
      }
      return true
    }),
  preview: {
    select: {title: 'title', position: 'position', scope: 'scope', enabled: 'enabled'},
    prepare: ({title, position, scope, enabled}) => {
      const where: Record<string, string> = {
        headStart: 'Head start',
        headEnd: 'Head end',
        bodyStart: 'Body start',
        bodyEnd: 'Body end',
      }
      return {
        title: `${enabled === false ? '(off) ' : ''}${title ?? 'Untitled'}`,
        subtitle: `${where[position] ?? position} · ${scope === 'pages' ? 'Specific pages' : 'Entire site'}`,
      }
    },
  },
})
