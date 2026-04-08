import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { type NextRequest } from 'next/server'
import { createTRPCContext } from '@/server/api/trpc'
import { appRouter } from '@/server/api/root'

const isDev = process.env['NODE_ENV'] === 'development'

const handler = (req: NextRequest) =>
  fetchRequestHandler({
    endpoint: '/api/trpc',
    req,
    router: appRouter,
    createContext: () => createTRPCContext({ headers: req.headers }),
    ...(isDev && {
      onError: ({ path, error }: { path: string | undefined; error: Error }) => {
        console.error(`tRPC error on ${path ?? '<unknown>'}:`, error)
      },
    }),
  })

export { handler as GET, handler as POST }
