#!/usr/bin/env node
// copy-templates.mjs — copies templates/* into packages/cli/templates/*
// Run after tsc build so the dist/ bundle includes the template files.

import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs'
import { join, dirname, sep } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))
const root = join(__dirname, '..', '..', '..')
const src = join(root, 'templates')
const dest = join(__dirname, '..', 'templates')

if (!existsSync(src)) {
  console.error(`Templates source not found: ${src}`)
  process.exit(1)
}

if (existsSync(dest)) {
  rmSync(dest, { recursive: true, force: true })
}

mkdirSync(dest, { recursive: true })
cpSync(src, dest, {
  recursive: true,
  filter: (src) => {
    const segments = src.split(sep)
    // Exclude local workspace/build artifacts from the bundled template
    return !(
      segments.includes('node_modules') ||
      segments.includes('.next') ||
      segments.includes('.git') ||
      segments.includes('.turbo') ||
      src.endsWith('/.env.local')
    )
  },
})

console.log(`✓ Copied templates/* → packages/cli/templates/*`)
