export const STATUSES = ['new', 'active', 'upcoming', 'expired'] as const;
export type TStatus = (typeof STATUSES)[number];

export const PRIORITIES = ['high', 'low', 'medium'] as const;
export type TPriority = (typeof PRIORITIES)[number];
