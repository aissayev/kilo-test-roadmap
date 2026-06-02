import { Paper, Stack, Group, Title, Text, Badge, Progress, rem } from '@mantine/core';
import type { Epoch, TicketStatus } from '@/lib/types';
import { epochStatusMeta } from '@/lib/ui';
import { TicketCard } from './TicketCard';

type Filter = 'all' | TicketStatus;

export function EpochColumn({ epoch, filter }: { epoch: Epoch; filter: Filter }) {
  const meta = epochStatusMeta[epoch.status];
  const done = epoch.tickets.filter((t) => t.status === 'done').length;
  const total = epoch.tickets.length;
  const pct = total ? Math.round((done / total) * 100) : 0;
  const visible =
    filter === 'all' ? epoch.tickets : epoch.tickets.filter((t) => t.status === filter);

  return (
    <Paper withBorder radius="md" p="md" bg="dark.8" style={{ width: rem(330), flexShrink: 0 }}>
      <Stack gap="sm">
        <Group justify="space-between" align="flex-start" wrap="nowrap">
          <div>
            <Text size="xs" c="dimmed" fw={600} tt="uppercase">
              {epoch.timeframe}
            </Text>
            <Title order={3} fz={rem(18)}>
              {epoch.name}
            </Title>
          </div>
          <Badge color={meta.color} variant="light" radius="sm">
            {meta.label}
          </Badge>
        </Group>

        <Text size="sm" c="dimmed" lineClamp={2}>
          {epoch.goal}
        </Text>

        <Group gap="xs" align="center" wrap="nowrap">
          <Progress value={pct} color="teal" size="sm" radius="xl" style={{ flex: 1 }} />
          <Text size="xs" c="dimmed" fw={600}>
            {done}/{total}
          </Text>
        </Group>

        <Stack gap="sm" mt={4}>
          {visible.length === 0 ? (
            <Text size="sm" c="dimmed" ta="center" py="md">
              No tickets
            </Text>
          ) : (
            visible.map((t) => <TicketCard key={t.id} ticket={t} />)
          )}
        </Stack>
      </Stack>
    </Paper>
  );
}
