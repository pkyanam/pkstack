import { db } from '../db'
import { createAuth } from '@pkstack/auth'

export const auth = createAuth({
  db,
})

export type Session = typeof auth.$Infer.Session
