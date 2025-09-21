import { neon } from '@netlify/neon';
import { drizzle } from 'drizzle-orm/neon-http';
import { Client } from '@neondatabase/serverless';
import * as schema from './schema';

export const db = drizzle({
    schema,
    client: neon()
});