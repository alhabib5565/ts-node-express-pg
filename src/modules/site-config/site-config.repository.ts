import pool from '../../config/database';
import { ISiteConfig } from './site-config.interface';

const createSiteConfig = async (siteConfigData: ISiteConfig): Promise<ISiteConfig> => {
  const query = `
    INSERT INTO site_config (
      website_name, website_logo, favicon, contact_number, email,
      home_meta_title, home_meta_description,
      about_meta_title, about_meta_description,
      course_meta_title, course_meta_description,
      contact_meta_title, contact_meta_description,
      footer_title, footer_description,
      addresses, social_links
    )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17)
    RETURNING *
  `;

  const values = [
    siteConfigData.website_name,
    siteConfigData.website_logo,
    siteConfigData.favicon,
    siteConfigData.contact_number,
    siteConfigData.email,
    siteConfigData.home_meta_title,
    siteConfigData.home_meta_description,
    siteConfigData.about_meta_title,
    siteConfigData.about_meta_description,
    siteConfigData.course_meta_title,
    siteConfigData.course_meta_description,
    siteConfigData.contact_meta_title,
    siteConfigData.contact_meta_description,
    siteConfigData.footer_title,
    siteConfigData.footer_description,
    JSON.stringify(siteConfigData.addresses),
    JSON.stringify(siteConfigData.social_links),
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const findSiteConfig = async (): Promise<ISiteConfig | null> => {
  const result = await pool.query(`SELECT * FROM site_config LIMIT 1`);
  return result.rows[0] ?? null;
};

const updateSiteConfig = async (siteConfigData: Partial<ISiteConfig>): Promise<ISiteConfig | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let param = 1;

  if (siteConfigData.website_name !== undefined) {
    fields.push(`website_name = $${param++}`);
    values.push(siteConfigData.website_name);
  }
  if (siteConfigData.website_logo !== undefined) {
    fields.push(`website_logo = $${param++}`);
    values.push(siteConfigData.website_logo);
  }
  if (siteConfigData.favicon !== undefined) {
    fields.push(`favicon = $${param++}`);
    values.push(siteConfigData.favicon);
  }
  if (siteConfigData.contact_number !== undefined) {
    fields.push(`contact_number = $${param++}`);
    values.push(siteConfigData.contact_number);
  }
  if (siteConfigData.email !== undefined) {
    fields.push(`email = $${param++}`);
    values.push(siteConfigData.email);
  }
  if (siteConfigData.home_meta_title !== undefined) {
    fields.push(`home_meta_title = $${param++}`);
    values.push(siteConfigData.home_meta_title);
  }
  if (siteConfigData.home_meta_description !== undefined) {
    fields.push(`home_meta_description = $${param++}`);
    values.push(siteConfigData.home_meta_description);
  }
  if (siteConfigData.about_meta_title !== undefined) {
    fields.push(`about_meta_title = $${param++}`);
    values.push(siteConfigData.about_meta_title);
  }
  if (siteConfigData.about_meta_description !== undefined) {
    fields.push(`about_meta_description = $${param++}`);
    values.push(siteConfigData.about_meta_description);
  }
  if (siteConfigData.course_meta_title !== undefined) {
    fields.push(`course_meta_title = $${param++}`);
    values.push(siteConfigData.course_meta_title);
  }
  if (siteConfigData.course_meta_description !== undefined) {
    fields.push(`course_meta_description = $${param++}`);
    values.push(siteConfigData.course_meta_description);
  }
  if (siteConfigData.contact_meta_title !== undefined) {
    fields.push(`contact_meta_title = $${param++}`);
    values.push(siteConfigData.contact_meta_title);
  }
  if (siteConfigData.contact_meta_description !== undefined) {
    fields.push(`contact_meta_description = $${param++}`);
    values.push(siteConfigData.contact_meta_description);
  }
  if (siteConfigData.footer_title !== undefined) {
    fields.push(`footer_title = $${param++}`);
    values.push(siteConfigData.footer_title);
  }
  if (siteConfigData.footer_description !== undefined) {
    fields.push(`footer_description = $${param++}`);
    values.push(siteConfigData.footer_description);
  }
  if (siteConfigData.addresses !== undefined) {
    fields.push(`addresses = $${param++}`);
    values.push(JSON.stringify(siteConfigData.addresses));
  }
  if (siteConfigData.social_links !== undefined) {
    fields.push(`social_links = $${param++}`);
    values.push(JSON.stringify(siteConfigData.social_links));
  }

  if (!fields.length) return null;

  const query = `
    UPDATE site_config
    SET ${fields.join(', ')}, updated_at = NOW()
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
};

export const siteConfigRepository = {
  createSiteConfig,
  findSiteConfig,
  updateSiteConfig,
};
