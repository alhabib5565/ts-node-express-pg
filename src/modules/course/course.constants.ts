// course.constants.ts
export const LEVELS = ['beginner', 'intermediate', 'advanced'] as const;
export type TLevel = (typeof LEVELS)[number];
