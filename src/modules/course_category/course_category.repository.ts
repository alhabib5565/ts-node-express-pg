import pool from '../../config/database';
import { ICourseCategory } from './course_category.interface';

const createCourseCategory = async (payload: Partial<ICourseCategory>) => {
  const query = `
    INSERT INTO course_categories (name, is_active)
    VALUES ($1, $2)
    RETURNING *
  `;
  const values = [payload.name, payload.is_active ?? true];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllCourseCategories = async (search: string, limit: number, offset: number) => {
  const query = `
    SELECT *
    FROM course_categories
    WHERE name ILIKE $1
    ORDER BY created_at DESC
    LIMIT $2 OFFSET $3
  `;

  const values = [`%${search}%`, limit, offset];
  const result = await pool.query(query, values);

  return result.rows;
};

const countCourseCategories = async (search: string) => {
  const query = `
    SELECT COUNT(*) 
    FROM course_categories 
    WHERE name ILIKE $1
  `;

  const values = [`%${search}%`];
  const result = await pool.query(query, values);

  return Number(result.rows[0]?.count || 0);
};

const getCourseCategoryById = async (id: number) => {
  const query = `
    SELECT *
    FROM course_categories
    WHERE id = $1
  `;
  const result = await pool.query(query, [id]);

  return result.rows[0];
};

const updateCourseCategoryById = async (id: number, payload: Partial<ICourseCategory>) => {
  const query = `
    UPDATE course_categories
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

const deleteCourseCategoryById = async (id: number) => {
  const query = `
    DELETE FROM course_categories
    WHERE id = $1
    RETURNING *
  `;

  const result = await pool.query(query, [id]);
  return result.rows[0];
};

export const courseCategoryRepository = {
  createCourseCategory,
  getAllCourseCategories,
  getCourseCategoryById,
  updateCourseCategoryById,
  deleteCourseCategoryById,
  countCourseCategories,
};
