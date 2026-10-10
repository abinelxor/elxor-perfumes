'use client'

/**
 * Sanity Studio configuration for the copy embedded in the website at /studio.
 * (The standalone studio in /studio uses the same schemas from ./schemaTypes.)
 */
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Documents that exist exactly once
const singletons = ['siteSettings', 'homePage']

export default defineConfig({
  name: 'default',
  title: 'ELXOR Perfumes',

  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'wox0hir2',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Content')
          .items([
            S.listItem()
              .title('Home page')
              .id('homePage')
              .child(S.document().schemaType('homePage').documentId('homePage')),
            S.listItem()
              .title('Site settings')
              .id('siteSettings')
              .child(S.document().schemaType('siteSettings').documentId('siteSettings')),
            S.divider(),
            ...S.documentTypeListItems().filter(
              (item) => !singletons.includes(item.getId() ?? ''),
            ),
          ]),
    }),
    visionTool({defaultApiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-01-01'}),
  ],

  schema: {
    types: schemaTypes,
    // Don't offer "create new Site settings": there is only one
    templates: (templates) => templates.filter(({schemaType}) => !singletons.includes(schemaType)),
  },

  document: {
    actions: (prev, {schemaType}) =>
      singletons.includes(schemaType)
        ? prev.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : prev,
  },
})
