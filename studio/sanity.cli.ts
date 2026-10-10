import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'wox0hir2',
    dataset: 'production',
  },
  // Note: do not add an `app: {...}` block here. That key marks the project as a
  // custom Sanity App (not a Studio) and makes `sanity dev` look for src/App.
})
