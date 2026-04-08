import 'server-only'
import { createCallerFactory, createTRPCContext } from './trpc'
import { appRouter } from './root'
import { headers } from 'next/headers'

// RSC caller — no HTTP round-trip from Server Components
const createCaller = createCallerFactory(appRouter)

export const api = createCaller(async () => {
  return createTRPCContext({ headers: await headers() })
})
