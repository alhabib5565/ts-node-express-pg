export interface IFaq {
  id?: number;
  question: string;
  answer: string;
  is_active?: boolean;
  created_at: Date;
  updated_at: Date;
}
