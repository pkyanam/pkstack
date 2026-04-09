import { auth } from '@/lib/auth'
import { createAuthRouteHandlers } from '@pkstack/auth'

export const { POST, GET } = createAuthRouteHandlers(auth)
