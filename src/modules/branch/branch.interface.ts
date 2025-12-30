export interface IBranch {
  id?: number;
  name: string;
  address: string;
  city: string;
  area: string;
  phone: string;
  email: string;
  is_active?: boolean;
  latitude: string;
  longitude: string;
  created_at: Date;
  updated_at: Date;
}
