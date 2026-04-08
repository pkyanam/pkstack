#!/usr/bin/env tsx
// check-env.ts — runs before npm run dev / npm run build
// Validates required env vars and prints a clear action for each missing one.

interface EnvCheck {
  key: string
  hint: string
  required: boolean
}

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
  'Copy .env.example to .env.local and fill in the values above.',
])

process.exit(1)
