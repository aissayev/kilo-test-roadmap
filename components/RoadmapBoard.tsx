'use client';

import { useMemo, useState } from 'react';
import {
  Box,
  Container,
  Group,
  Stack,
  Title,
  Text,
  Badge,
  Card,
  SimpleGrid,
  SegmentedControl,
  ScrollArea,
  Flex,
  ThemeIcon,
  rem,
} from '@mantine/core';
import {
  IconRocket,
  IconListDetails,
  IconProgress,
  IconCircleCheck,
} from '@tabler/icons-react';
import type { Roadmap, TicketStatus } from '@/lib/types';
import { EpochColumn } from './EpochColumn';

type Filter = 'all' | TicketStatus;

export function RoadmapBoard({ roadmap }: { roadmap: Roadmap }) {
  const [filter, setFilter] = useState<Filter>('all');

  const stats = useMemo(() => {
    const tickets = roadmap.epochs.flatMap((e) => e.tickets);
    const done = tickets.filter((t) => t.status === 'done').length;
    const inProgress = tickets.filter(
      (t) => t.status === 'in-progress' || t.status === 'in-review',
    ).length;
    return {
      epochs: roadmap.epochs.length,
      tickets: tickets.length,
      inProgress,
      completion: tickets.length ? Math.round((done / tickets.length) * 100) : 0,
    };
  }, [roadmap]);

  const statCards = [
    { label: 'Epochs', value: stats.epochs, icon: IconRocket, color: 'indigo' },
    { label: 'Tickets', value: stats.tickets, icon: IconListDetails, color: 'blue' },
    { label: 'In progress', value: stats.inProgress, icon: IconProgress, color: 'yellow' },
    { label: 'Completed', value: `${stats.completion}%`, icon: IconCircleCheck, color: 'teal' },
  ];

  return (
    <Box className="min-h-screen bg-gradient-to-b from-[#0b1120] via-[#0f172a] to-[#0b1120]">
      <Container size="xl" py="xl">
        <Stack gap="xl">
          {/* Header */}
          <Stack gap={6}>
            <Group gap="xs">
              <Badge variant="light" color="indigo" size="lg" radius="sm">
                {roadmap.product}
              </Badge>
              <Text size="sm" c="dimmed">
                Updated {roadmap.updatedAt}
              </Text>
            </Group>
            <Title order={1} fz={rem(34)} lh={1.1}>
              Product Roadmap
            </Title>
            <Text c="dimmed" maw={640}>
              How we&apos;re building {roadmap.product} — organized into epochs, each
              delivering a themed set of tickets that move from backlog to done.
            </Text>
          </Stack>

          {/* Summary stats */}
          <SimpleGrid cols={{ base: 2, sm: 4 }} spacing="md">
            {statCards.map((s) => {
              const Icon = s.icon;
              return (
                <Card key={s.label} withBorder radius="md" padding="lg" bg="dark.7">
                  <Group gap="sm" wrap="nowrap">
                    <ThemeIcon size={42} radius="md" variant="light" color={s.color}>
                      <Icon style={{ width: rem(22), height: rem(22) }} />
                    </ThemeIcon>
                    <div>
                      <Text fz={rem(24)} fw={700} lh={1}>
                        {s.value}
                      </Text>
                      <Text size="xs" c="dimmed" tt="uppercase" fw={600}>
                        {s.label}
                      </Text>
                    </div>
                  </Group>
                </Card>
              );
            })}
          </SimpleGrid>

          {/* Status filter */}
          <Group justify="space-between" align="center" wrap="wrap" gap="sm">
            <Text fw={600} size="sm" c="dimmed">
              Filter by status
            </Text>
            <ScrollArea type="never" maw="100%">
              <SegmentedControl
                value={filter}
                onChange={(v) => setFilter(v as Filter)}
                data={[
                  { label: 'All', value: 'all' },
                  { label: 'Planned', value: 'planned' },
                  { label: 'In progress', value: 'in-progress' },
                  { label: 'In review', value: 'in-review' },
                  { label: 'Done', value: 'done' },
                ]}
                size="sm"
              />
            </ScrollArea>
          </Group>

          {/* Board */}
          <ScrollArea type="auto" offsetScrollbars scrollbarSize={8}>
            <Flex gap="lg" align="flex-start" pb="md">
              {roadmap.epochs.map((epoch) => (
                <EpochColumn key={epoch.id} epoch={epoch} filter={filter} />
              ))}
            </Flex>
          </ScrollArea>

          <Text size="xs" c="dimmed" ta="center">
            Data source: sample data · Notion integration ready (set NOTION_API_KEY to go live)
          </Text>
        </Stack>
      </Container>
    </Box>
  );
}
