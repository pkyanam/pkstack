import { createDrizzleConfig } from '@pkstack/db/drizzle'

export default createDrizzleConfig({
  schema: ['./src/db/schema.ts', './src/db/auth-schema.ts'],
})
