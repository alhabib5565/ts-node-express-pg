import pool from '../../config/database';
import { INotice } from './notice.interface';

const createNotice = async (noticeData: INotice): Promise<INotice> => {
  const query = `
    INSERT INTO notices (date, title, notice_category_id, description, status, priority)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const values = [
    noticeData.date,
    noticeData.title,
    noticeData.notice_category_id,
    noticeData.description,
    noticeData.status,
    noticeData.priority,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const findNoticeById = async (id: string): Promise<INotice | null> => {
  const result = await pool.query(`SELECT * FROM notices WHERE id = $1`, [id]);
  return result.rows[0] ?? null;
};

const findAllNotices = async (limit: number, offset: number, search: string): Promise<INotice[]> => {
  const query = `
    SELECT * FROM notices
    ${search ? `WHERE title ILIKE $3` : ''}
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;
  const params = search ? [limit, offset, `%${search}%`] : [limit, offset];
  const result = await pool.query(query, params);
  return result.rows;
};

const updateNotice = async (id: string, noticeData: Partial<INotice>): Promise<INotice | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let param = 1;

  if (noticeData.date !== undefined) {
    fields.push(`date = $${param++}`);
    values.push(noticeData.date);
  }
  if (noticeData.title !== undefined) {
    fields.push(`title = $${param++}`);
    values.push(noticeData.title);
  }
  if (noticeData.notice_category_id !== undefined) {
    fields.push(`notice_category_id = $${param++}`);
    values.push(noticeData.notice_category_id);
  }
  if (noticeData.description !== undefined) {
    fields.push(`description = $${param++}`);
    values.push(noticeData.description);
  }
  if (noticeData.status !== undefined) {
    fields.push(`status = $${param++}`);
    values.push(noticeData.status);
  }
  if (noticeData.priority !== undefined) {
    fields.push(`priority = $${param++}`);
    values.push(noticeData.priority);
  }

  if (!fields.length) return null;

  values.push(id);

  const query = `
    UPDATE notices
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${param}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
};

const deleteNotice = async (id: string): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM notices WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
};

const countNotices = async (): Promise<number> => {
  const result = await pool.query(`SELECT COUNT(*) AS total FROM notices`);
  return parseInt(result.rows[0].total);
};

export const noticeRepository = {
  createNotice,
  findNoticeById,
  findAllNotices,
  updateNotice,
  deleteNotice,
  countNotices,
};
