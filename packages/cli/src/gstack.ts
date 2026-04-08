import { existsSync, mkdirSync, symlinkSync, unlinkSync } from 'node:fs'
import { join } from 'node:path'
import { pipeline } from 'node:stream/promises'
import { createGunzip } from 'node:zlib'
// @ts-expect-error — tar has no bundled types; @types/tar is a devDependency
import tar from 'tar'
import { GSTACK_GLOBAL_DIR, GSTACK_INSTALL_SUBDIR, GSTACK_TARBALL_URL, GSTACK_VERSION } from './constants.js'

export interface GstackInstallResult {
  success: boolean
  method: 'symlink' | 'download' | 'failed'
  error?: string
}

export async function installGstack(projectDir: string): Promise<GstackInstallResult> {
  const installDir = join(projectDir, GSTACK_INSTALL_SUBDIR)

  // If global install exists, symlink it
  if (existsSync(GSTACK_GLOBAL_DIR)) {
    try {
      mkdirSync(join(projectDir, '.claude', 'skills'), { recursive: true })
      // Remove existing symlink/dir if present
      if (existsSync(installDir)) {
        unlinkSync(installDir)
      }
      symlinkSync(GSTACK_GLOBAL_DIR, installDir)
      return { success: true, method: 'symlink' }
    } catch (err) {
      // Symlink failed, fall through to download
    }
  }

  // Download tarball
  try {
    mkdirSync(installDir, { recursive: true })
    const url = GSTACK_TARBALL_URL(GSTACK_VERSION)

    const response = await fetch(url)
    if (!response.ok || !response.body) {
      throw new Error(`HTTP ${response.status} fetching ${url}`)
    }

    // Stream tarball directly into the install dir
    const tarStream = tar.extract({ cwd: installDir, strip: 1 })
    await pipeline(response.body as unknown as NodeJS.ReadableStream, createGunzip(), tarStream)

    return { success: true, method: 'download' }
  } catch (err) {
    const error = err instanceof Error ? err.message : String(err)
    return { success: false, method: 'failed', error }
  }
}

export function printGstackFailureBox(_projectName: string, error: string): void {
  const lines = [
    '  ⚠  gstack installation failed',
    '',
    `  ${error}`,
    '',
    '  Your project was scaffolded successfully, but the AI agent',
    '  workflow toolchain (gstack) could not be installed.',
    '',
    `  To install later:  npx create-pkstack setup-gstack`,
    `  Or manually:       https://github.com/garrytan/gstack`,
  ]

  const width = Math.max(...lines.map((l) => l.length)) + 2
  const border = '─'.repeat(width)

  console.warn(`\n┌${border}┐`)
  for (const line of lines) {
    const pad = width - line.length
    console.warn(`│ ${line}${' '.repeat(pad)} │`)
  }
  console.warn(`└${border}┘\n`)
}
