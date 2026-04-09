import { expect, test } from '@playwright/test'
import { execFileSync, spawn } from 'node:child_process'
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { setTimeout as delay } from 'node:timers/promises'
import { fileURLToPath } from 'node:url'
import { generateEnvFiles } from '../../packages/cli/src/env.js'
import { scaffold } from '../../packages/cli/src/scaffold.js'

const CURRENT_FILE = fileURLToPath(import.meta.url)
const CURRENT_DIR = dirname(CURRENT_FILE)
const REPO_ROOT = join(CURRENT_DIR, '..', '..')

async function waitForServer(url, readLogs) {
  for (let attempt = 0; attempt < 60; attempt += 1) {
    try {
      const response = await fetch(url)
      if (response.ok) {
        return
      }
    } catch {
      // Server is not ready yet.
    }

    await delay(1_000)
  }

  throw new Error(`Timed out waiting for ${url}\n\n${readLogs()}`)
}

test('generated web app boots in a browser', async ({ page }) => {
  for (const workspace of [
    'packages/ui',
    'packages/db',
    'packages/auth',
    'packages/ai',
    'packages/api',
    'packages/cli',
  ]) {
    execFileSync('npm', ['run', 'build', '-w', workspace], {
      cwd: REPO_ROOT,
      env: process.env,
      stdio: 'inherit',
    })
  }

  const sandboxDir = mkdtempSync(join(tmpdir(), 'pkstack-e2e-'))
  const projectDir = join(sandboxDir, 'web-app')
  const port = 3311

  process.env.PKSTACK_LOCAL_WORKSPACE = '1'

  scaffold({
    template: 'web',
    projectName: 'web-app',
    projectDir,
    includeTrpc: false,
    includeStripe: false,
    includeResend: false,
  })

  generateEnvFiles({
    projectDir,
    projectName: 'web-app',
    includeStripe: false,
    includeResend: false,
  })

  execFileSync('npm', ['install'], {
    cwd: projectDir,
    env: process.env,
    stdio: 'inherit',
  })

  execFileSync('npm', ['run', 'build'], {
    cwd: projectDir,
    env: process.env,
    stdio: 'inherit',
  })

  let serverLogs = ''
  const server = spawn('npm', ['run', 'start', '--', '--hostname', '127.0.0.1', '--port', String(port)], {
    cwd: projectDir,
    env: process.env,
    stdio: 'pipe',
  })

  server.stdout.on('data', (chunk) => {
    serverLogs += chunk.toString()
  })

  server.stderr.on('data', (chunk) => {
    serverLogs += chunk.toString()
  })

  try {
    await waitForServer(`http://127.0.0.1:${port}`, () => serverLogs)
    await page.goto(`http://127.0.0.1:${port}`)
    await expect(page.getByRole('heading', { name: 'pkstack' })).toBeVisible()
    await expect(page.getByText('Your AI-native Next.js app is ready.')).toBeVisible()

    const generatedPackageJson = JSON.parse(readFileSync(join(projectDir, 'package.json'), 'utf8'))
    expect(generatedPackageJson.dependencies?.['@pkstack/ui']).toMatch(/^file:/)
  } finally {
    server.kill('SIGTERM')
    if (existsSync(sandboxDir)) {
      rmSync(sandboxDir, { recursive: true, force: true })
    }
    delete process.env.PKSTACK_LOCAL_WORKSPACE
  }
})
