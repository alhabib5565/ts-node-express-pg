import { z } from 'zod';

export const createSiteConfigSchema = z.object({
  body: z.object({
    website_name: z.string().min(1, 'Website name is required'),
    website_logo: z.string().min(1, 'Website logo is required'),
    favicon: z.string().min(1, 'Favicon is required'),
    contact_number: z.string().min(1, 'Contact number is required'),
    email: z.string().email('Invalid email').min(1, 'Email is required'),
    home_meta_title: z.string().min(1, 'Home meta title is required'),
    home_meta_description: z.string().min(1, 'Home meta description is required'),
    about_meta_title: z.string().min(1, 'About meta title is required'),
    about_meta_description: z.string().min(1, 'About meta description is required'),
    course_meta_title: z.string().min(1, 'Course meta title is required'),
    course_meta_description: z.string().min(1, 'Course meta description is required'),
    contact_meta_title: z.string().min(1, 'Contact meta title is required'),
    contact_meta_description: z.string().min(1, 'Contact meta description is required'),
    footer_title: z.string().min(1, 'Footer title is required'),
    footer_description: z.string().min(1, 'Footer description is required'),
    addresses: z.any(),
    social_links: z.any(),
  }),
});

export const updateSiteConfigSchema = z.object({
  body: z.object({
    website_name: z.string().min(1, 'Website name is required').optional(),
    website_logo: z.string().min(1, 'Website logo is required').optional(),
    favicon: z.string().min(1, 'Favicon is required').optional(),
    contact_number: z.string().min(1, 'Contact number is required').optional(),
    email: z.string().email('Invalid email').optional(),
    home_meta_title: z.string().min(1, 'Home meta title is required').optional(),
    home_meta_description: z.string().min(1, 'Home meta description is required').optional(),
    about_meta_title: z.string().min(1, 'About meta title is required').optional(),
    about_meta_description: z.string().min(1, 'About meta description is required').optional(),
    course_meta_title: z.string().min(1, 'Course meta title is required').optional(),
    course_meta_description: z.string().min(1, 'Course meta description is required').optional(),
    contact_meta_title: z.string().min(1, 'Contact meta title is required').optional(),
    contact_meta_description: z.string().min(1, 'Contact meta description is required').optional(),
    footer_title: z.string().min(1, 'Footer title is required').optional(),
    footer_description: z.string().min(1, 'Footer description is required').optional(),
    addresses: z.any().optional(),
    social_links: z.any().optional(),
  }),
});
