#!/usr/bin/env node

import { createRequire } from 'node:module'
import { dirname, join } from 'node:path'
import { existsSync, rmSync } from 'node:fs'

const require = createRequire(import.meta.url)

try {
  const previewingPackagePath = require.resolve('@mintlify/previewing/package.json')
  const previewingDir = dirname(previewingPackagePath)
  const nestedReactDir = join(previewingDir, 'node_modules', 'react')

  if (existsSync(nestedReactDir)) {
    rmSync(nestedReactDir, { recursive: true, force: true })
    console.log('Removed nested @mintlify/previewing React to avoid duplicate React runtime in mint dev.')
  }
} catch (error) {
  const message = error instanceof Error ? error.message : String(error)
  console.warn(`Skipping Mint React fix: ${message}`)
}
