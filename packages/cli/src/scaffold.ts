import {
  copyFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs'
import { join, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

export interface ScaffoldOptions {
  projectName: string
  projectDir: string
  includeTrpc: boolean
  includeStripe: boolean
  includeResend: boolean
}

const TEMPLATE_DIR = join(fileURLToPath(import.meta.url), '..', '..', 'templates', 'web')

const EXCLUDED_TEMPLATE_SEGMENTS = [
  `${join('', '.git')}`,
  `${join('', '.next')}`,
  `${join('', '.turbo')}`,
  'node_modules',
]

// Files/dirs to exclude when tRPC is not selected
const TRPC_PATHS = [
  'src/server',
  'src/app/api/trpc',
]

// Files to remove when Stripe is not selected
const STRIPE_PATHS = [
  'src/app/api/webhooks/stripe',
]

// Files to remove when Resend is not selected
const RESEND_PATHS = [
  'src/lib/email.ts',
]

export function scaffold(opts: ScaffoldOptions): void {
  const { projectName, projectDir, includeTrpc, includeStripe, includeResend } = opts

  if (existsSync(projectDir)) {
    throw new Error(`Directory "${projectDir}" already exists. Choose a different project name.`)
  }

  try {
    copyDirRecursive(TEMPLATE_DIR, projectDir, (srcPath) => {
      const rel = relative(TEMPLATE_DIR, srcPath)

      if (EXCLUDED_TEMPLATE_SEGMENTS.some((segment) => rel === segment || rel.startsWith(`${segment}/`))) {
        return false
      }

      if (rel === '.env.local') return false

      // Strip tRPC files if not selected
      if (!includeTrpc && TRPC_PATHS.some((p) => rel.startsWith(p))) return false

      // Strip Stripe files if not selected
      if (!includeStripe && STRIPE_PATHS.some((p) => rel.startsWith(p))) return false

      // Strip Resend files if not selected
      if (!includeResend && RESEND_PATHS.some((p) => rel.startsWith(p))) return false

      return true
    })

    // Patch package.json: set project name
    patchPackageJson(projectDir, projectName, { includeTrpc })

    // Patch layout.tsx if tRPC excluded
    if (!includeTrpc) {
      patchLayoutWithoutTrpc(projectDir)
    }

    // Patch page.tsx if tRPC excluded
    if (!includeTrpc) {
      patchPageWithoutTrpc(projectDir)
    }
  } catch (err) {
    // Cleanup on partial failure
    if (existsSync(projectDir)) {
      rmSync(projectDir, { recursive: true, force: true })
    }
    throw err
  }
}

function copyDirRecursive(
  src: string,
  dest: string,
  filter: (srcPath: string) => boolean
): void {
  if (!filter(src)) return

  const stat = statSync(src)
  if (stat.isDirectory()) {
    mkdirSync(dest, { recursive: true })
    for (const entry of readdirSync(src)) {
      copyDirRecursive(join(src, entry), join(dest, entry), filter)
    }
  } else {
    copyFileSync(src, dest)
  }
}

function patchPackageJson(
  projectDir: string,
  projectName: string,
  options: { includeTrpc: boolean }
): void {
  const pkgPath = join(projectDir, 'package.json')
  const pkg = JSON.parse(readFileSync(pkgPath, 'utf8')) as {
    name?: string
    dependencies?: Record<string, string>
  }
  pkg['name'] = sanitizeName(projectName)
  if (!options.includeTrpc && pkg.dependencies) {
    for (const dependency of [
      '@tanstack/react-query',
      '@trpc/client',
      '@trpc/react-query',
      '@trpc/server',
      'superjson',
    ]) {
      delete pkg.dependencies[dependency]
    }
  }
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

function patchLayoutWithoutTrpc(projectDir: string): void {
  const layoutPath = join(projectDir, 'src/app/layout.tsx')
  if (!existsSync(layoutPath)) return
  let content = readFileSync(layoutPath, 'utf8')
  content = content
    .replace("import { TRPCProvider } from '@/server/api/provider'\n", '')
    .replace('<TRPCProvider>{children}</TRPCProvider>', '{children}')
  writeFileSync(layoutPath, content)
}

function patchPageWithoutTrpc(projectDir: string): void {
  const pagePath = join(projectDir, 'src/app/page.tsx')
  if (!existsSync(pagePath)) return
  const simpleContent = `export default function HomePage() {
  return (
    <main className="container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">pkstack</h1>
        <p className="text-muted-foreground">Your AI-native Next.js app is ready.</p>
      </div>
    </main>
  )
}
`
  writeFileSync(pagePath, simpleContent)
}

export function sanitizeName(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-') || 'my-app'
}
