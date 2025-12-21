export interface IBatch {
  id?: number;
  name: string;
  description?: string | null;
  day: string[];
  time: string;
  is_active?: boolean;
  created_at: Date;
  updated_at: Date;
}
