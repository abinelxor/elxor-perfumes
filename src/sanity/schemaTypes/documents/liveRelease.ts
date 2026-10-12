import {defineField, defineType} from 'sanity'

/**
 * A single record that is rewritten every time someone clicks "Push to live" in the
 * Studio. A Sanity webhook that only watches this document tells the website to
 * refresh, so normal publishing never changes the live site by itself.
 */
export const liveRelease = defineType({
  name: 'liveRelease',
  title: 'Live release',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({name: 'requestedAt', title: 'Last pushed to live', type: 'datetime'}),
    defineField({name: 'requestedBy', title: 'Pushed by', type: 'string'}),
  ],
  preview: {
    select: {at: 'requestedAt', by: 'requestedBy'},
    prepare: ({at, by}) => ({
      title: 'Live release',
      subtitle: at ? `Pushed ${new Date(at).toLocaleString()}${by ? ` by ${by}` : ''}` : 'Never pushed',
    }),
  },
})
