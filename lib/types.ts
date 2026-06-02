// Domain model for the roadmap.
//
// A tech-company roadmap is organized top-down:
//   Roadmap → Epochs (themed, time-boxed initiatives) → Tickets (units of work)
// This mirrors how most product orgs plan: quarterly/themed buckets that each
// carry a backlog of issues moving through a status workflow.

export type TicketStatus =
  | 'backlog'
  | 'planned'
  | 'in-progress'
  | 'in-review'
  | 'done';

export type Priority = 'low' | 'medium' | 'high' | 'urgent';

export type EpochStatus = 'planned' | 'active' | 'completed';

export interface Assignee {
  name: string;
  initials: string;
  /** Mantine color key used for the avatar. */
  color: string;
}

export interface Ticket {
  id: string;
  /** Human-facing key, e.g. "KILO-201". */
  key: string;
  title: string;
  description?: string;
  status: TicketStatus;
  priority: Priority;
  assignee?: Assignee;
  labels: string[];
  /** Story points / effort estimate. */
  points?: number;
}

export interface Epoch {
  id: string;
  name: string;
  /** The objective / theme this epoch delivers. */
  goal: string;
  /** Display timeframe, e.g. "Q2 2026". */
  timeframe: string;
  status: EpochStatus;
  tickets: Ticket[];
}

export interface Roadmap {
  product: string;
  /** Human-readable last-updated label. */
  updatedAt: string;
  epochs: Epoch[];
}
