import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'
import * as schema from './schema'
import * as authSchema from './auth-schema'

const connectionString = process.env['DATABASE_URL']
if (!connectionString) {
  throw new Error('DATABASE_URL is not set. Run: cp .env.example .env.local and fill in your values.')
}

// Disable prefetch as it is not supported for "Transaction" pool mode (Neon)
const client = postgres(connectionString, { prepare: false })

export const db = drizzle(client, { schema: { ...schema, ...authSchema } })
