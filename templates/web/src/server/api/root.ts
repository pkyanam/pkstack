import { createTRPCRouter } from './trpc'
import { postRouter } from './routers/post'

export const appRouter = createTRPCRouter({
  post: postRouter,
})

export type AppRouter = typeof appRouter
