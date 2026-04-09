import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

export type DatabaseSchema = Record<string, unknown>

type UnionToIntersection<T> =
  (T extends unknown ? (input: T) => void : never) extends (input: infer R) => void ? R : never

export function getDatabaseUrl(connectionString = process.env['DATABASE_URL']) {
  if (!connectionString) {
    throw new Error(
      'DATABASE_URL is not set. Update .env.local with your database connection string.'
    )
  }

  return connectionString
}

export function createPostgresClient(connectionString = getDatabaseUrl()) {
  return postgres(connectionString, { prepare: false })
}

export function mergeSchemas<const TSchemas extends readonly DatabaseSchema[]>(...schemas: TSchemas) {
  return Object.assign({}, ...schemas) as UnionToIntersection<TSchemas[number]>
}

export function createDb<TSchema extends DatabaseSchema>(
  schema: TSchema,
  connectionString = getDatabaseUrl()
) {
  const client = createPostgresClient(connectionString)
  return drizzle(client, { schema })
}
