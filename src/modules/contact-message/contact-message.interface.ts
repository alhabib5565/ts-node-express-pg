export interface IContactMessage {
  id?: number;
  first_name: string;
  last_name: string;
  phone: string;
  email?: string;
  subject: string;
  message: string;
  created_at: Date;
  updated_at: Date;
}
