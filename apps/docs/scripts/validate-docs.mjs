#!/usr/bin/env node

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

const root = process.cwd()
const docsConfigPath = join(root, 'docs.json')

if (!existsSync(docsConfigPath)) {
  console.error('Missing docs.json')
  process.exit(1)
}

/** @type {{ name?: string, navigation?: { pages?: string[], groups?: Array<{ pages?: string[] }> } }} */
const config = JSON.parse(readFileSync(docsConfigPath, 'utf8'))

if (!config.name) {
  console.error('docs.json must define a site name.')
  process.exit(1)
}

const pages = [
  ...(config.navigation?.pages ?? []),
  ...((config.navigation?.groups ?? []).flatMap((group) => group.pages ?? [])),
]

if (pages.length === 0) {
  console.error('docs.json must define at least one page in navigation.')
  process.exit(1)
}

for (const page of pages) {
  const filename = `${page}.mdx`
  const absolutePath = join(root, filename)

  if (!existsSync(absolutePath)) {
    console.error(`Missing docs page referenced in docs.json: ${filename}`)
    process.exit(1)
  }
}

console.log(`Validated ${pages.length} docs page(s) for ${config.name}.`)
