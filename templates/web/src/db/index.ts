import * as schema from './schema'
import { createDb, mergeSchemas } from '@pkstack/db'
import { authSchema } from './auth-schema'

export const db = createDb(mergeSchemas(schema, authSchema))
