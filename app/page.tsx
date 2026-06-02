import { getRoadmap } from '@/lib/roadmap-data';
import { RoadmapBoard } from '@/components/RoadmapBoard';

// Server component: resolves roadmap data (Notion or sample) at build time,
// then hands plain data to the client board for rendering.
export default async function Page() {
  const roadmap = await getRoadmap();
  return <RoadmapBoard roadmap={roadmap} />;
}
