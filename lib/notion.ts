import { Client } from '@notionhq/client';
import type { Roadmap } from './types';

/**
 * Notion integration seam.
 *
 * For v1 this is intentionally NOT wired to a live database. `getRoadmap()` in
 * `roadmap-data.ts` falls back to sample data whenever the Notion env vars are
 * absent, so the app builds and deploys with zero configuration.
 *
 * To go live later:
 *   1. Create a Notion internal integration and share the roadmap database with it.
 *   2. Set NOTION_API_KEY and NOTION_ROADMAP_DB_ID (see .env.example).
 *   3. Implement the page → Epoch/Ticket mapping in `fetchRoadmapFromNotion`
 *      to match your database's property schema.
 */
export function isNotionConfigured(): boolean {
  return Boolean(process.env.NOTION_API_KEY && process.env.NOTION_ROADMAP_DB_ID);
}

export async function fetchRoadmapFromNotion(): Promise<Roadmap> {
  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  const databaseId = process.env.NOTION_ROADMAP_DB_ID as string;

  // Verifies credentials + access. The response → Roadmap mapping depends on
  // the finalized DB schema and is the next implementation step.
  await notion.databases.query({ database_id: databaseId, page_size: 1 });

  throw new Error(
    'Notion mapping not implemented yet — finalize the database schema, then map ' +
      'pages to Epoch/Ticket here.',
  );
}
