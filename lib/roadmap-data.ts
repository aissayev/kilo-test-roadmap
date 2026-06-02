import type { Roadmap, Assignee } from './types';
import { fetchRoadmapFromNotion, isNotionConfigured } from './notion';

const ana: Assignee = { name: 'Ana Sokolova', initials: 'AS', color: 'grape' };
const bekzat: Assignee = { name: 'Bekzat Nurlanuly', initials: 'BN', color: 'blue' };
const daulet: Assignee = { name: 'Daulet Iskakov', initials: 'DI', color: 'teal' };
const madina: Assignee = { name: 'Madina Yermek', initials: 'MY', color: 'orange' };

/**
 * Sample roadmap used until the Notion database is wired up. Shaped exactly
 * like what `fetchRoadmapFromNotion` will return, so swapping the source is a
 * one-line change in `getRoadmap`.
 */
export const sampleRoadmap: Roadmap = {
  product: 'Kilo',
  updatedAt: 'Jun 2, 2026',
  epochs: [
    {
      id: 'epoch-foundation',
      name: 'Foundation',
      goal: 'Stand up the platform, auth, and engineering baseline.',
      timeframe: 'Q1 2026',
      status: 'completed',
      tickets: [
        {
          id: 't-101',
          key: 'KILO-101',
          title: 'Design system & component library',
          status: 'done',
          priority: 'high',
          assignee: ana,
          labels: ['frontend', 'design'],
          points: 8,
        },
        {
          id: 't-102',
          key: 'KILO-102',
          title: 'Authentication & SSO',
          status: 'done',
          priority: 'urgent',
          assignee: bekzat,
          labels: ['backend', 'security'],
          points: 13,
        },
        {
          id: 't-103',
          key: 'KILO-103',
          title: 'CI/CD pipeline & preview deploys',
          status: 'done',
          priority: 'medium',
          assignee: daulet,
          labels: ['infra', 'devops'],
          points: 5,
        },
        {
          id: 't-104',
          key: 'KILO-104',
          title: 'Postgres schema & migrations',
          status: 'done',
          priority: 'high',
          assignee: bekzat,
          labels: ['backend', 'data'],
          points: 8,
        },
      ],
    },
    {
      id: 'epoch-core',
      name: 'Core Product',
      goal: 'Ship the roadmap experience end to end with live data.',
      timeframe: 'Q2 2026',
      status: 'active',
      tickets: [
        {
          id: 't-201',
          key: 'KILO-201',
          title: 'Roadmap board UI',
          status: 'in-progress',
          priority: 'high',
          assignee: ana,
          labels: ['frontend'],
          points: 8,
        },
        {
          id: 't-202',
          key: 'KILO-202',
          title: 'Notion data sync',
          status: 'in-progress',
          priority: 'high',
          assignee: daulet,
          labels: ['backend', 'integration'],
          points: 13,
        },
        {
          id: 't-203',
          key: 'KILO-203',
          title: 'Realtime updates over websockets',
          status: 'in-review',
          priority: 'medium',
          assignee: bekzat,
          labels: ['backend'],
          points: 8,
        },
        {
          id: 't-204',
          key: 'KILO-204',
          title: 'Ticket detail drawer & comments',
          status: 'planned',
          priority: 'medium',
          assignee: ana,
          labels: ['frontend'],
          points: 5,
        },
        {
          id: 't-205',
          key: 'KILO-205',
          title: 'Role-based access control',
          status: 'planned',
          priority: 'high',
          assignee: bekzat,
          labels: ['backend', 'security'],
          points: 8,
        },
      ],
    },
    {
      id: 'epoch-growth',
      name: 'Growth & Scale',
      goal: 'Open the platform up and make it fast for bigger teams.',
      timeframe: 'Q3 2026',
      status: 'planned',
      tickets: [
        {
          id: 't-301',
          key: 'KILO-301',
          title: 'Analytics dashboard',
          status: 'planned',
          priority: 'medium',
          assignee: madina,
          labels: ['frontend', 'data'],
          points: 8,
        },
        {
          id: 't-302',
          key: 'KILO-302',
          title: 'Public API & webhooks',
          status: 'planned',
          priority: 'high',
          assignee: daulet,
          labels: ['backend', 'platform'],
          points: 13,
        },
        {
          id: 't-303',
          key: 'KILO-303',
          title: 'Performance & caching pass',
          status: 'backlog',
          priority: 'medium',
          assignee: bekzat,
          labels: ['infra'],
          points: 5,
        },
        {
          id: 't-304',
          key: 'KILO-304',
          title: 'Multi-workspace support',
          status: 'backlog',
          priority: 'high',
          assignee: ana,
          labels: ['platform'],
          points: 13,
        },
      ],
    },
    {
      id: 'epoch-intelligence',
      name: 'Intelligence',
      goal: 'Layer AI assistance on top of the roadmap data.',
      timeframe: 'Q4 2026',
      status: 'planned',
      tickets: [
        {
          id: 't-401',
          key: 'KILO-401',
          title: 'AI roadmap assistant',
          status: 'backlog',
          priority: 'high',
          assignee: madina,
          labels: ['ai', 'frontend'],
          points: 13,
        },
        {
          id: 't-402',
          key: 'KILO-402',
          title: 'Smart ticket triage',
          status: 'backlog',
          priority: 'medium',
          assignee: daulet,
          labels: ['ai', 'backend'],
          points: 8,
        },
        {
          id: 't-403',
          key: 'KILO-403',
          title: 'Predictive delivery dates',
          status: 'backlog',
          priority: 'low',
          assignee: bekzat,
          labels: ['ai', 'data'],
          points: 8,
        },
      ],
    },
  ],
};

/**
 * Single entry point the UI calls. Uses Notion when configured, otherwise the
 * sample data above. Runs server-side (build time for the static export).
 */
export async function getRoadmap(): Promise<Roadmap> {
  if (isNotionConfigured()) {
    try {
      return await fetchRoadmapFromNotion();
    } catch (error) {
      console.warn('[roadmap] Notion fetch failed, falling back to sample data:', error);
    }
  }
  return sampleRoadmap;
}
