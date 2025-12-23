import { TPriority, TStatus } from './notice.constants';

export interface INotice {
  id?: number;
  date: Date;
  title: string;
  notice_category_id: number;
  description: string;
  status: TStatus;
  priority: TPriority;
  created_at?: Date;
  updated_at?: Date;
}
