'use client'

import {visionTool} from '@sanity/vision'
import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'

import {apiVersion, dataset, projectId} from './sanity/env'
import {schema} from './sanity/schemaTypes'
import {structure} from './sanity/structure'

export default defineConfig({
  basePath: '/sanity',
  name: 'default',
  title: 'The Ground Narrative',
  projectId,
  dataset,
  apiVersion,
  schema: {
    types: schema.types,
  },
  plugins: [
    structureTool({
      structure: (S) => S.list().title('Content').items(S.documentTypeListItems())
    }),
    visionTool({defaultApiVersion: apiVersion}),
  ],
})
