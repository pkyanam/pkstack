import { createPostInputSchema, deletePostInputSchema, getPostByIdInputSchema } from '@pkstack/api'
import { eq } from 'drizzle-orm'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { posts } from '@/db/schema'

export const postRouter = createTRPCRouter({
  list: publicProcedure.query(async ({ ctx }) => {
    return ctx.db.select().from(posts).orderBy(posts.createdAt)
  }),

  byId: publicProcedure
    .input(getPostByIdInputSchema)
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.select().from(posts).where(eq(posts.id, input.id)).limit(1)
      return result[0] ?? null
    }),

  create: protectedProcedure
    .input(createPostInputSchema)
    .mutation(async ({ ctx, input }) => {
      const [post] = await ctx.db
        .insert(posts)
        .values({
          title: input.title,
          content: input.content ?? null,
          authorId: ctx.session.user.id,
        })
        .returning()
      return post
    }),

  delete: protectedProcedure
    .input(deletePostInputSchema)
    .mutation(async ({ ctx, input }) => {
      await ctx.db.delete(posts).where(eq(posts.id, input.id))
    }),
})
