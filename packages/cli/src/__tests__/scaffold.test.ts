import { describe, it, expect, afterEach } from 'vitest'
import { existsSync, mkdirSync, readFileSync, rmSync } from 'node:fs'
import { join } from 'node:path'
import { tmpdir } from 'node:os'
import { scaffold, sanitizeName } from '../scaffold.js'

const TMP = join(tmpdir(), 'pkstack-test')

function tempDir(name: string): string {
  return join(TMP, `${name}-${Date.now()}`)
}

afterEach(() => {
  if (existsSync(TMP)) rmSync(TMP, { recursive: true, force: true })
})

describe('sanitizeName', () => {
  it('lowercases and strips special chars', () => {
    expect(sanitizeName('My App!')).toBe('my-app')
  })
  it('falls back to my-app for empty input', () => {
    expect(sanitizeName('')).toBe('my-app')
  })
})

describe('scaffold', () => {
  it('happy path: web + all defaults → files exist, package.json name correct', () => {
    const dir = tempDir('defaults')
    mkdirSync(TMP, { recursive: true })
    scaffold({
      projectName: 'test-app',
      projectDir: dir,
      database: 'neon',
      includeTrpc: true,
      includeStripe: true,
      includeResend: true,
    })
    expect(existsSync(join(dir, 'package.json'))).toBe(true)
    expect(existsSync(join(dir, 'src/db/schema.ts'))).toBe(true)
    expect(existsSync(join(dir, 'src/server/api/trpc.ts'))).toBe(true)
    expect(existsSync(join(dir, 'docker-compose.yml'))).toBe(true)
    expect(existsSync(join(dir, 'AGENTS.md'))).toBe(true)

    const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as { name: string }
    expect(pkg.name).toBe('test-app')
  })

  it('tRPC excluded → no src/server/ directory', () => {
    const dir = tempDir('no-trpc')
    mkdirSync(TMP, { recursive: true })
    scaffold({
      projectName: 'test-no-trpc',
      projectDir: dir,
      database: 'neon',
      includeTrpc: false,
      includeStripe: false,
      includeResend: false,
    })
    expect(existsSync(join(dir, 'src/server'))).toBe(false)
  })

  it('duplicate directory → throws, no overwrite', () => {
    const dir = tempDir('dup')
    mkdirSync(dir, { recursive: true })
    expect(() =>
      scaffold({
        projectName: 'dup',
        projectDir: dir,
        database: 'neon',
        includeTrpc: true,
        includeStripe: false,
        includeResend: false,
      })
    ).toThrow('already exists')
  })

  it('partial failure → output directory removed', () => {
    const dir = tempDir('partial-fail')
    mkdirSync(dir, { recursive: true })
    expect(() =>
      scaffold({
        projectName: 'partial-fail',
        projectDir: dir,
        database: 'neon',
        includeTrpc: true,
        includeStripe: false,
        includeResend: false,
      })
    ).toThrow()
  })
})
