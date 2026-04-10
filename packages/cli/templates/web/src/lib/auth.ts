import { db } from '../db'
import { createAuth, type Auth } from '@pkstack/auth'

export const auth: Auth = createAuth({
  db,
})

export type Session = typeof auth.$Infer.Session
