export interface IAddress {
  label: string;
  address: string;
  area: string;
  city: string;
  phone: string;
}

export interface ISocialLink {
  platform: string;
  icon: string;
  link: string;
}

export interface ISiteConfig {
  id?: number;
  website_name: string;
  website_logo: string;
  favicon: string;
  contact_number: string;
  email: string;
  home_meta_title: string;
  home_meta_description: string;
  about_meta_title: string;
  about_meta_description: string;
  course_meta_title: string;
  course_meta_description: string;
  contact_meta_title: string;
  contact_meta_description: string;
  footer_title: string;
  footer_description: string;
  addresses: IAddress[];
  social_links: ISocialLink[];
  created_at: Date;
  updated_at: Date;
}
