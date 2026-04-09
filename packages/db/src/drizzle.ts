import { defineConfig } from 'drizzle-kit'
import { getDatabaseUrl } from './index.js'

export interface CreateDrizzleConfigOptions {
  schema: string | readonly string[]
  out?: string
}

export function createDrizzleConfig({
  schema,
  out = './drizzle',
}: CreateDrizzleConfigOptions) {
  const normalizedSchema = typeof schema === 'string' ? schema : Array.from(schema)

  return defineConfig({
    schema: normalizedSchema,
    out,
    dialect: 'postgresql',
    dbCredentials: {
      url: getDatabaseUrl(),
    },
  })
}
