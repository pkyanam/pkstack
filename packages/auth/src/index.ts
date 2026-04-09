import { betterAuth } from 'better-auth'
import { drizzleAdapter } from 'better-auth/adapters/drizzle'
import { toNextJsHandler } from 'better-auth/next-js'
import { authSchema } from './auth-schema.js'

export { accounts, authSchema, sessions, users, verifications } from './auth-schema.js'

type AuthDatabase = Parameters<typeof drizzleAdapter>[0]

export interface CreateAuthOptions {
  db: AuthDatabase
  baseURL?: string
  secret?: string
  emailAndPassword?: {
    enabled: boolean
  }
}

export function createAuth({
  db,
  baseURL = process.env['BETTER_AUTH_URL'],
  secret = process.env['BETTER_AUTH_SECRET'],
  emailAndPassword = {
    enabled: true,
  },
}: CreateAuthOptions) {
  return betterAuth({
    ...(baseURL ? { baseURL } : {}),
    ...(secret ? { secret } : {}),
    database: drizzleAdapter(db, {
      provider: 'pg',
      schema: authSchema,
    }),
    emailAndPassword,
  })
}

type AuthInstance = ReturnType<typeof createAuth>

export async function getSession(auth: AuthInstance, headers: Headers) {
  return auth.api.getSession({ headers })
}

export function authMiddleware(auth: AuthInstance) {
  return toNextJsHandler(auth)
}

export const createAuthRouteHandlers = authMiddleware

export type Session = AuthInstance['$Infer']['Session']
