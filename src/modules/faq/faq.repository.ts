import pool from '../../config/database';
import { IFaq } from './faq.interface';

const createFaq = async (faqData: IFaq): Promise<IFaq> => {
  const query = `
    INSERT INTO faqs (question, answer, is_active)
    VALUES ($1, $2, $3)
    RETURNING *
  `;

  const values = [faqData.question, faqData.answer, faqData.is_active ?? true];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const findFaqById = async (id: string): Promise<IFaq | null> => {
  const result = await pool.query(`SELECT * FROM faqs WHERE id = $1`, [id]);
  return result.rows[0] ?? null;
};

const findAllFaqs = async (limit: number, offset: number, search: string): Promise<IFaq[]> => {
  const query = `
    SELECT * FROM faqs
    ${search ? `WHERE question ILIKE $3` : ''}
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;
  const params = search ? [limit, offset, `%${search}%`] : [limit, offset];
  const result = await pool.query(query, params);
  return result.rows;
};

const updateFaq = async (id: string, faqData: Partial<IFaq>): Promise<IFaq | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let param = 1;

  if (faqData.question !== undefined) {
    fields.push(`question = $${param++}`);
    values.push(faqData.question);
  }
  if (faqData.answer !== undefined) {
    fields.push(`answer = $${param++}`);
    values.push(faqData.answer);
  }
  if (faqData.is_active !== undefined) {
    fields.push(`is_active = $${param++}`);
    values.push(faqData.is_active);
  }

  if (!fields.length) return null;

  values.push(id);

  const query = `
    UPDATE faqs
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${param}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
};

const deleteFaq = async (id: string): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM faqs WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
};

const countFaqs = async (): Promise<number> => {
  const result = await pool.query(`SELECT COUNT(*) AS total FROM faqs`);
  return parseInt(result.rows[0].total);
};

export const faqRepository = {
  createFaq,
  findFaqById,
  findAllFaqs,
  updateFaq,
  deleteFaq,
  countFaqs,
};
