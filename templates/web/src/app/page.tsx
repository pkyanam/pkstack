import { api } from '@/server/api/server'

export default async function HomePage() {
  const posts = await api.post.list()

  return (
    <main className="container mx-auto py-16 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold tracking-tight mb-2">pkstack</h1>
        <p className="text-muted-foreground mb-8">
          Your AI-native Next.js app is ready.
        </p>
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-xl font-semibold mb-4">Posts ({posts.length})</h2>
          {posts.length === 0 ? (
            <p className="text-muted-foreground text-sm">No posts yet. Sign in to create one.</p>
          ) : (
            <ul className="space-y-2">
              {posts.map((post) => (
                <li key={post.id} className="text-sm">
                  {post.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </main>
  )
}
