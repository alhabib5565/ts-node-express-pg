export interface IFaq {
  id?: number;
  question: string;
  answer: string;
  is_active?: boolean;
  created_at: Date;
  updated_at: Date;
}
//when create faq id, create_at and update_at don't need to pass
