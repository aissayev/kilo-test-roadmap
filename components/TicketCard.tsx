import { Card, Group, Text, Badge, Avatar, Tooltip, ThemeIcon } from '@mantine/core';
import {
  IconFlame,
  IconArrowUp,
  IconArrowRight,
  IconArrowDown,
} from '@tabler/icons-react';
import type { Ticket, Priority } from '@/lib/types';
import { statusMeta, priorityMeta } from '@/lib/ui';

const priorityIcon: Record<Priority, typeof IconFlame> = {
  urgent: IconFlame,
  high: IconArrowUp,
  medium: IconArrowRight,
  low: IconArrowDown,
};

export function TicketCard({ ticket }: { ticket: Ticket }) {
  const sMeta = statusMeta[ticket.status];
  const pMeta = priorityMeta[ticket.priority];
  const PIcon = priorityIcon[ticket.priority];

  return (
    <Card withBorder radius="md" padding="sm" bg="dark.7">
      <Group justify="space-between" mb={6} wrap="nowrap">
        <Text size="xs" c="dimmed" fw={700} ff="monospace">
          {ticket.key}
        </Text>
        <Tooltip label={`${pMeta.label} priority`} withArrow>
          <ThemeIcon size="sm" variant="transparent" color={pMeta.color}>
            <PIcon style={{ width: 16, height: 16 }} />
          </ThemeIcon>
        </Tooltip>
      </Group>

      <Text size="sm" fw={600} lh={1.3} mb="xs">
        {ticket.title}
      </Text>

      {ticket.labels.length > 0 && (
        <Group gap={6} mb="sm">
          {ticket.labels.map((l) => (
            <Badge key={l} size="xs" variant="default" radius="sm">
              {l}
            </Badge>
          ))}
        </Group>
      )}

      <Group justify="space-between" align="center" wrap="nowrap">
        <Badge color={sMeta.color} variant="light" size="sm" radius="sm">
          {sMeta.label}
        </Badge>
        <Group gap={6} wrap="nowrap">
          {typeof ticket.points === 'number' && (
            <Badge size="sm" variant="outline" color="gray" radius="xl">
              {ticket.points} pts
            </Badge>
          )}
          {ticket.assignee && (
            <Tooltip label={ticket.assignee.name} withArrow>
              <Avatar color={ticket.assignee.color} radius="xl" size={26}>
                <Text size="xs" fw={700}>
                  {ticket.assignee.initials}
                </Text>
              </Avatar>
            </Tooltip>
          )}
        </Group>
      </Group>
    </Card>
  );
}
