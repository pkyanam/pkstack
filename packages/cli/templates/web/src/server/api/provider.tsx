'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { createTRPCClient, httpBatchStreamLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import { type ReactNode, useState } from 'react'
import superjson from 'superjson'
import { getQueryClient } from './query-client'
import { type AppRouter } from './root'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const trpc: ReturnType<typeof createTRPCReact<AppRouter>> = createTRPCReact<AppRouter>()

function getBaseUrl() {
  if (typeof window !== 'undefined') return ''
  if (process.env['VERCEL_URL']) return `https://${process.env['VERCEL_URL']}`
  return `http://localhost:${process.env['PORT'] ?? 3000}`
}

export function TRPCProvider({ children }: { children: ReactNode }) {
  const queryClient = getQueryClient()
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchStreamLink({
          transformer: superjson,
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    })
  )
  return (
    <QueryClientProvider client={queryClient}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        {children}
      </trpc.Provider>
    </QueryClientProvider>
  )
}

// For non-React Query usage (plain tRPC client)
export function createTRPCVanillaClient() {
  return createTRPCClient<AppRouter>({
    links: [
      httpBatchStreamLink({
        transformer: superjson,
        url: `${getBaseUrl()}/api/trpc`,
      }),
    ],
  })
}
