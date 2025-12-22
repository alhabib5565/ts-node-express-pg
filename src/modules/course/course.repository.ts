// course.repository.ts
import pool from '../../config/database';
import { ICourse } from './course.interface';

const createCourse = async (payload: ICourse) => {
  const query = `
    INSERT INTO courses 
    (title, bio, description, thumbnail, price, level, category_id, is_active)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
    RETURNING *
  `;
  const {
    title,
    bio,
    description,
    thumbnail,
    price,
    level,
    category_id,
    is_active = true,
  } = payload;
  const values = [title, bio, description, thumbnail, price, level, category_id, is_active];
  const result = await pool.query(query, values);
  return result.rows[0];
};

const getAllCourses = async (query_params: Record<string, any>) => {
  const { page = 1, limit = 10, search = '', category_id } = query_params;
  const offset = (page - 1) * limit;

  let query = `
    SELECT * FROM courses
    WHERE 1 = 1
  `;
  const params: any[] = [];

  if (search) {
    params.push(`%${search}%`);
    query += ` AND (title ILIKE $${params.length} OR bio ILIKE $${params.length} OR description ILIKE $${params.length})`;
  }

  if (category_id) {
    params.push(category_id);
    query += ` AND category_id = $${params.length}`;
  }

  // pagination params
  params.push(limit);
  params.push(offset);
  query += ` ORDER BY created_at DESC LIMIT $${params.length - 1} OFFSET $${params.length}`;

  const result = await pool.query(query, params);
  return result.rows;
};

const getCourseById = async (id: number) => {
  const query = `SELECT * FROM courses WHERE id = $1`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const updateCourse = async (id: number, payload: Partial<ICourse>) => {
  const fields = Object.keys(payload);
  const values = Object.values(payload);

  if (fields.length === 0) return null;

  const setQuery = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

  const query = `
    UPDATE courses
    SET ${setQuery}, updated_at = NOW()
    WHERE id = $${fields.length + 1}
    RETURNING *
  `;

  const params = [...values, id];

  const result = await pool.query(query, params);
  return result.rows[0];
};

const deleteCourse = async (id: number) => {
  const query = `DELETE FROM courses WHERE id = $1 RETURNING *`;
  const result = await pool.query(query, [id]);
  return result.rows[0];
};

const countCourses = async () => {
  const query = `SELECT COUNT(*) as total FROM courses`;
  const result = await pool.query(query);
  return parseInt(result.rows[0].total);
};

export const courseRepository = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  countCourses,
};
