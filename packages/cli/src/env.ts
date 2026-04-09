import { writeFileSync } from 'node:fs'
import { join } from 'node:path'

export interface EnvOptions {
  projectDir: string
  projectName: string
  includeStripe: boolean
  includeResend: boolean
}

export function generateEnvFiles(opts: EnvOptions): void {
  const { projectDir, projectName, includeStripe, includeResend } = opts

  const dbName = projectName.toLowerCase().replace(/[^a-z0-9]/g, '_')

  const lines: string[] = [
    '# Database',
    `# Local: docker compose up -d, then use:`,
    `DATABASE_URL=postgresql://postgres:postgres@localhost:5432/${dbName}`,
    `# Production (Neon): replace with your Neon connection string`,
    '',
    '# Auth',
    '# Generate with: openssl rand -base64 32',
    'BETTER_AUTH_SECRET=',
    'BETTER_AUTH_URL=http://localhost:3000',
    '',
  ]

  if (includeStripe) {
    lines.push(
      '# Stripe',
      'STRIPE_SECRET_KEY=sk_test_...',
      'STRIPE_WEBHOOK_SECRET=whsec_...',
      'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...',
      ''
    )
  }

  if (includeResend) {
    lines.push('# Resend', 'RESEND_API_KEY=re_...', 'RESEND_FROM_EMAIL=noreply@yourdomain.com', '')
  }

  const content = lines.join('\n')

  writeFileSync(join(projectDir, '.env.example'), content)
  writeFileSync(
    join(projectDir, '.env.local'),
    content
      .replace('BETTER_AUTH_SECRET=', `BETTER_AUTH_SECRET=${generateSecret()}`)
  )
}

function generateSecret(): string {
  // Simple random hex — not crypto-grade but fine for a local dev default
  // Users should regenerate with: openssl rand -base64 32
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Buffer.from(bytes).toString('base64')
}
