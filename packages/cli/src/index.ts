#!/usr/bin/env node
import { intro, outro, text, confirm, spinner, isCancel, cancel, log } from '@clack/prompts'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { scaffold } from './scaffold.js'
import { installGstack, printGstackFailureBox } from './gstack.js'
import { generateEnvFiles } from './env.js'
import { GSTACK_VERSION } from './constants.js'

const [, , ...args] = process.argv

// setup-gstack subcommand
if (args[0] === 'setup-gstack') {
  await runSetupGstack()
  process.exit(0)
}

// Main scaffold flow
await runCreate()

async function runCreate() {
  console.log('')
  intro(' create-pkstack ')

  // Project name
  const rawName = args[0] ?? (await text({
    message: 'What is your project name?',
    placeholder: 'my-app',
    validate(value) {
      if (!value || value.trim().length === 0) return 'Project name is required'
      if (/[^a-zA-Z0-9-_.]/.test(value)) return 'Use only letters, numbers, hyphens, underscores, and dots'
      return undefined
    },
  }))

  if (isCancel(rawName)) { cancel('Cancelled.'); process.exit(0) }
  const projectName = String(rawName).trim()
  const projectDir = resolve(process.cwd(), projectName)

  if (existsSync(projectDir)) {
    log.error(`Directory "${projectName}" already exists. Choose a different name.`)
    process.exit(1)
  }

  // tRPC
  const includeTrpc = await confirm({
    message: 'Include tRPC?',
    initialValue: true,
  })
  if (isCancel(includeTrpc)) { cancel('Cancelled.'); process.exit(0) }

  // Stripe
  const includeStripe = await confirm({
    message: 'Include payments (Stripe)?',
    initialValue: true,
  })
  if (isCancel(includeStripe)) { cancel('Cancelled.'); process.exit(0) }

  // Resend
  const includeResend = await confirm({
    message: 'Include email (Resend)?',
    initialValue: true,
  })
  if (isCancel(includeResend)) { cancel('Cancelled.'); process.exit(0) }

  // Scaffold files
  const s = spinner()
  s.start('Scaffolding files')
  try {
    scaffold({
      projectName,
      projectDir,
      includeTrpc: Boolean(includeTrpc),
      includeStripe: Boolean(includeStripe),
      includeResend: Boolean(includeResend),
    })
    s.stop('Files scaffolded')
  } catch (err) {
    s.stop('Scaffold failed')
    log.error(err instanceof Error ? err.message : String(err))
    process.exit(1)
  }

  // Generate env files
  generateEnvFiles({
    projectDir,
    projectName,
    includeStripe: Boolean(includeStripe),
    includeResend: Boolean(includeResend),
  })

  // Install gstack
  s.start('Installing gstack AI workflow toolchain')
  const gstackResult = await installGstack(projectDir)
  if (gstackResult.success) {
    s.stop(
      gstackResult.method === 'symlink'
        ? 'gstack linked from global install'
        : `gstack v${GSTACK_VERSION} installed`
    )
  } else {
    s.stop('gstack installation failed (continuing)')
    printGstackFailureBox(projectName, gstackResult.error ?? 'Unknown error')
  }

  outro(`✓ ${projectName} created successfully!\n
  Next steps:
    cd ${projectName}
    # .env.local was generated for you
    $EDITOR .env.local
    docker compose up -d          # start local Postgres (or use Neon free tier)
    npm install
    npm run dev
  `)
}

async function runSetupGstack() {
  const s = spinner()
  intro(' create-pkstack setup-gstack ')
  s.start('Installing gstack')
  const result = await installGstack(process.cwd())
  if (result.success) {
    s.stop(result.method === 'symlink' ? 'gstack linked from global install' : 'gstack installed')
    outro('✓ gstack is ready. Reload Claude Code to pick up the new skills.')
  } else {
    s.stop('Installation failed')
    printGstackFailureBox('your project', result.error ?? 'Unknown error')
    process.exit(1)
  }
}
