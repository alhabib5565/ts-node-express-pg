import pool from '../../config/database';
import { INoticeCategory } from './notice_category.interface';

const createNoticeCategory = async (payload: Partial<INoticeCategory>) => {
  const query = `
    INSERT INTO notice_categories (name, is_active)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [payload.name, payload.is_active ?? true];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllNoticeCategories = async (search: string, limit: number, offset: number) => {
  const query = `
    SELECT *
    FROM notice_categories
    WHERE name ILIKE $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;

  const values = [`%${search}%`, limit, offset];
  const result = await pool.query(query, values);

  return result.rows;
};

const countNoticeCategories = async (search: string) => {
  const query = `
    SELECT COUNT(*) 
    FROM notice_categories 
    WHERE name ILIKE $1
  `;

  const values = [`%${search}%`];
  const result = await pool.query(query, values);

  return Number(result.rows[0]?.count || 0);
};

const getNoticeCategoryById = async (id: number) => {
  const query = `
    SELECT *
    FROM notice_categories
    WHERE id = $1
  `;
  const result = await pool.query(query, [id]);

  return result.rows[0];
};

const updateNoticeCategoryById = async (id: number, payload: Partial<INoticeCategory>) => {
  const query = `
    UPDATE notice_categories
    SET name = COALESCE($1, name),
        is_active = COALESCE($2, is_active),
        updated_at = NOW()
    WHERE id = $3
    RETURNING *
  `;

  const values = [payload.name, payload.is_active, id];
  const result = await pool.query(query, values);

  return result.rows[0];
};

const deleteNoticeCategoryById = async (id: number) => {
  const query = `
    DELETE FROM notice_categories
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const noticeCategoryRepository = {
  createNoticeCategory,
  getAllNoticeCategories,
  getNoticeCategoryById,
  updateNoticeCategoryById,
  deleteNoticeCategoryById,
  countNoticeCategories,
};
