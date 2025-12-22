// course.interface.ts
import { TLevel } from './course.constants';

export interface ICourse {
  id?: number;
  title: string;
  bio: string;
  description: string;
  thumbnail: string;
  price: number;
  level: TLevel;
  category_id: number;
  is_active?: boolean;
  created_at?: Date;
  updated_at?: Date;
}
