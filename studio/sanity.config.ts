import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemaTypes'

// Documents that exist exactly once
const singletons = ['siteSettings', 'homePage']

export default defineConfig({
  name: 'default',
  title: 'ELXOR Perfumes',

  projectId: 'wox0hir2',
  dataset: 'production',

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
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Don't offer "create new Site settings": there is only one
    templates: (templates) =>
      templates.filter(({schemaType}) => !singletons.includes(schemaType)),
  },

  document: {
    actions: (prev, {schemaType}) =>
      singletons.includes(schemaType)
        ? prev.filter(({action}) => action && ['publish', 'discardChanges', 'restore'].includes(action))
        : prev,
  },
})
