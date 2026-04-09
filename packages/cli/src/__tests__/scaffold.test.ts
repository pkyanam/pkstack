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
      template: 'web',
      projectName: 'test-app',
      projectDir: dir,
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

  it('pins scaffolded dependency versions exactly', () => {
    const dir = tempDir('exact-versions')
    mkdirSync(TMP, { recursive: true })
    scaffold({
      template: 'web',
      projectName: 'exact-versions',
      projectDir: dir,
      includeTrpc: true,
      includeStripe: true,
      includeResend: true,
    })

    const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as {
      dependencies?: Record<string, string>
      devDependencies?: Record<string, string>
      optionalDependencies?: Record<string, string>
    }

    for (const section of [
      pkg.dependencies ?? {},
      pkg.devDependencies ?? {},
      pkg.optionalDependencies ?? {},
    ]) {
      for (const version of Object.values(section)) {
        expect(version).not.toMatch(/^[~^]/)
        expect(version).not.toBe('*')
      }
    }
  })

  it('tRPC excluded → no src/server/ directory', () => {
    const dir = tempDir('no-trpc')
    mkdirSync(TMP, { recursive: true })
    scaffold({
      template: 'web',
      projectName: 'test-no-trpc',
      projectDir: dir,
      includeTrpc: false,
      includeStripe: false,
      includeResend: false,
    })
    expect(existsSync(join(dir, 'src/server'))).toBe(false)
    expect(existsSync(join(dir, 'src/app/api/trpc'))).toBe(false)

    const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as {
      dependencies: Record<string, string>
    }
    expect(pkg.dependencies['@trpc/server']).toBeUndefined()
  })

  it('duplicate directory → throws, no overwrite', () => {
    const dir = tempDir('dup')
    mkdirSync(dir, { recursive: true })
    expect(() =>
      scaffold({
        template: 'web',
        projectName: 'dup',
        projectDir: dir,
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
        template: 'web',
        projectName: 'partial-fail',
        projectDir: dir,
        includeTrpc: true,
        includeStripe: false,
        includeResend: false,
      })
    ).toThrow()
  })

  it('mobile template scaffolds Expo app files', () => {
    const dir = tempDir('mobile')
    mkdirSync(TMP, { recursive: true })
    scaffold({
      template: 'mobile',
      projectName: 'mobile-app',
      projectDir: dir,
      includeTrpc: false,
      includeStripe: false,
      includeResend: false,
    })

    expect(existsSync(join(dir, 'App.tsx'))).toBe(true)
    expect(existsSync(join(dir, 'app.json'))).toBe(true)

    const pkg = JSON.parse(readFileSync(join(dir, 'package.json'), 'utf8')) as { name: string }
    expect(pkg.name).toBe('mobile-app')
  })
})
