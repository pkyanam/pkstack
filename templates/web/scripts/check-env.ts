#!/usr/bin/env tsx
// check-env.ts — runs before npm run dev / npm run build
// Validates required env vars and prints a clear action for each missing one.

import { existsSync, readFileSync } from 'node:fs'
import { join } from 'node:path'

interface EnvCheck {
  key: string
  hint: string
  required: boolean
}

function loadEnvFile(filename: string) {
  const filepath = join(process.cwd(), filename)
  if (!existsSync(filepath)) {
    return
  }

  const content = readFileSync(filepath, 'utf8')

  for (const rawLine of content.split('\n')) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) {
      continue
    }

    const separatorIndex = line.indexOf('=')
    if (separatorIndex === -1) {
      continue
    }

    const key = line.slice(0, separatorIndex).trim()
    const value = line.slice(separatorIndex + 1).trim()

    if (!process.env[key]) {
      process.env[key] = value
    }
  }
}

loadEnvFile('.env.local')
loadEnvFile('.env')

const checks: EnvCheck[] = [
  {
    key: 'DATABASE_URL',
    hint: 'Run: docker compose up -d  then use: postgresql://postgres:postgres@localhost:5432/myapp\n    Or sign up for a free Neon database at https://neon.tech',
    required: true,
  },
  {
    key: 'BETTER_AUTH_SECRET',
    hint: 'Generate with: openssl rand -base64 32',
    required: true,
  },
  // STRIPE_SECRET_KEY and RESEND_API_KEY are added by the CLI when selected
]

const missing = checks.filter(({ key, required }) => required && !process.env[key])

if (missing.length === 0) {
  process.exit(0)
}

const box = (lines: string[]) => {
  const width = Math.max(...lines.map((l) => l.length)) + 4
  const border = '─'.repeat(width)
  console.error(`\n┌${border}┐`)
  for (const line of lines) {
    const pad = width - line.length
    console.error(`│  ${line}${' '.repeat(pad)}  │`)
  }
  console.error(`└${border}┘\n`)
}

box([
  '  Missing environment variables  ',
  '',
  ...missing.flatMap(({ key, hint }) => [
    `✗  ${key}`,
    `   ${hint.replace(/\n/g, '\n   ')}`,
    '',
  ]),
  'Update .env.local with the values above.',
])

process.exit(1)
