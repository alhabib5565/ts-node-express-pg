export interface IUser {
  id: string;
  course_id: number;
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  is_active: boolean;
  created_at: Date;
  updated_at: Date;
}
