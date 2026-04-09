import { z } from 'zod'

export const postSchema = z.object({
  id: z.string(),
  title: z.string(),
  content: z.string().nullable(),
  authorId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export const getPostByIdInputSchema = z.object({
  id: z.string(),
})

export const createPostInputSchema = z.object({
  title: z.string().min(1).max(255),
  content: z.string().optional(),
})

export const deletePostInputSchema = z.object({
  id: z.string(),
})

export type Post = z.infer<typeof postSchema>
export type GetPostByIdInput = z.infer<typeof getPostByIdInputSchema>
export type CreatePostInput = z.infer<typeof createPostInputSchema>
export type DeletePostInput = z.infer<typeof deletePostInputSchema>

export interface PostRouterContract {
  list(): Promise<Post[]>
  byId(input: GetPostByIdInput): Promise<Post | null>
  create(input: CreatePostInput): Promise<Post>
  delete(input: DeletePostInput): Promise<void>
}
