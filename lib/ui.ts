import type { TicketStatus, Priority, EpochStatus } from './types';

// Presentation metadata — keeps Mantine color keys and labels in one place
// so cards, badges, and columns stay visually consistent.

export const statusMeta: Record<TicketStatus, { label: string; color: string }> = {
  backlog: { label: 'Backlog', color: 'gray' },
  planned: { label: 'Planned', color: 'blue' },
  'in-progress': { label: 'In progress', color: 'yellow' },
  'in-review': { label: 'In review', color: 'grape' },
  done: { label: 'Done', color: 'teal' },
};

export const priorityMeta: Record<Priority, { label: string; color: string }> = {
  urgent: { label: 'Urgent', color: 'red' },
  high: { label: 'High', color: 'orange' },
  medium: { label: 'Medium', color: 'blue' },
  low: { label: 'Low', color: 'gray' },
};

export const epochStatusMeta: Record<EpochStatus, { label: string; color: string }> = {
  active: { label: 'Active', color: 'indigo' },
  planned: { label: 'Planned', color: 'gray' },
  completed: { label: 'Completed', color: 'teal' },
};
