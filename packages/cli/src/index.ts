#!/usr/bin/env node
import { intro, outro, text, confirm, spinner, isCancel, cancel, log } from '@clack/prompts'
import { existsSync } from 'node:fs'
import { resolve } from 'node:path'
import { scaffold } from './scaffold.js'
import { installGstack, printGstackFailureBox } from './gstack.js'
import { generateEnvFiles } from './env.js'
import { GSTACK_VERSION } from './constants.js'

const [, , ...args] = process.argv
const mobileFlag = args.includes('--mobile')
const positionalArgs = args.filter((arg) => arg !== '--mobile')

// setup-gstack subcommand
if (positionalArgs[0] === 'setup-gstack') {
  await runSetupGstack()
  process.exit(0)
}

// Main scaffold flow
await runCreate()

async function runCreate() {
  console.log('')
  intro(' create-pkstack ')

  const template = mobileFlag ? 'mobile' : 'web'

  // Project name
  const rawName = positionalArgs[0] ?? (await text({
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

  let includeTrpc = false
  let includeStripe = false
  let includeResend = false

  if (template === 'web') {
    const rawIncludeTrpc = await confirm({
      message: 'Include tRPC?',
      initialValue: true,
    })
    if (isCancel(rawIncludeTrpc)) { cancel('Cancelled.'); process.exit(0) }
    includeTrpc = Boolean(rawIncludeTrpc)

    const rawIncludeStripe = await confirm({
      message: 'Include payments (Stripe)?',
      initialValue: true,
    })
    if (isCancel(rawIncludeStripe)) { cancel('Cancelled.'); process.exit(0) }
    includeStripe = Boolean(rawIncludeStripe)

    const rawIncludeResend = await confirm({
      message: 'Include email (Resend)?',
      initialValue: true,
    })
    if (isCancel(rawIncludeResend)) { cancel('Cancelled.'); process.exit(0) }
    includeResend = Boolean(rawIncludeResend)
  }

  // Scaffold files
  const s = spinner()
  s.start('Scaffolding files')
  try {
    scaffold({
      template,
      projectName,
      projectDir,
      includeTrpc,
      includeStripe,
      includeResend,
    })
    s.stop('Files scaffolded')
  } catch (err) {
    s.stop('Scaffold failed')
    log.error(err instanceof Error ? err.message : String(err))
    process.exit(1)
  }

  // Generate env files
  if (template === 'web') {
    generateEnvFiles({
      projectDir,
      projectName,
      includeStripe,
      includeResend,
    })
  }

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

  outro(
    template === 'web'
      ? `✓ ${projectName} created successfully!\n
  Next steps:
    cd ${projectName}
    # .env.local was generated for you
    $EDITOR .env.local
    docker compose up -d          # start local Postgres (or use Neon free tier)
    npm install
    npm run dev
  `
      : `✓ ${projectName} created successfully!\n
  Next steps:
    cd ${projectName}
    npm install
    npm run start
  `
  )
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
