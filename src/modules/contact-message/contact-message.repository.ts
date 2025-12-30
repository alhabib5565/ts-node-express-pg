import pool from '../../config/database';
import { IContactMessage } from './contact-message.interface';

const createContactMessage = async (contactMessageData: IContactMessage): Promise<IContactMessage> => {
  const query = `
    INSERT INTO contact_messages (first_name, last_name, phone, email, subject, message)
    VALUES ($1, $2, $3, $4, $5, $6)
    RETURNING *
  `;

  const values = [
    contactMessageData.first_name,
    contactMessageData.last_name,
    contactMessageData.phone,
    contactMessageData.email ?? null,
    contactMessageData.subject,
    contactMessageData.message,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const findContactMessageById = async (id: string): Promise<IContactMessage | null> => {
  const result = await pool.query(`SELECT * FROM contact_messages WHERE id = $1`, [id]);
  return result.rows[0] ?? null;
};

const findAllContactMessages = async (limit: number, offset: number, search: string): Promise<IContactMessage[]> => {
  const query = `
    SELECT * FROM contact_messages
    ${search ? `WHERE subject ILIKE $3 OR message ILIKE $3 OR first_name ILIKE $3 OR last_name ILIKE $3 OR phone ILIKE $3 OR email ILIKE $3` : ''}
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;
  const params = search ? [limit, offset, `%${search}%`] : [limit, offset];
  const result = await pool.query(query, params);
  return result.rows;
};

const updateContactMessage = async (id: string, contactMessageData: Partial<IContactMessage>): Promise<IContactMessage | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let param = 1;

  if (contactMessageData.first_name !== undefined) {
    fields.push(`first_name = $${param++}`);
    values.push(contactMessageData.first_name);
  }
  if (contactMessageData.last_name !== undefined) {
    fields.push(`last_name = $${param++}`);
    values.push(contactMessageData.last_name);
  }
  if (contactMessageData.phone !== undefined) {
    fields.push(`phone = $${param++}`);
    values.push(contactMessageData.phone);
  }
  if (contactMessageData.email !== undefined) {
    fields.push(`email = $${param++}`);
    values.push(contactMessageData.email);
  }
  if (contactMessageData.subject !== undefined) {
    fields.push(`subject = $${param++}`);
    values.push(contactMessageData.subject);
  }
  if (contactMessageData.message !== undefined) {
    fields.push(`message = $${param++}`);
    values.push(contactMessageData.message);
  }

  if (!fields.length) return null;

  values.push(id);

  const query = `
    UPDATE contact_messages
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${param}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
};

const deleteContactMessage = async (id: string): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM contact_messages WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
};

const countContactMessages = async (): Promise<number> => {
  const result = await pool.query(`SELECT COUNT(*) AS total FROM contact_messages`);
  return parseInt(result.rows[0].total);
};

export const contactMessageRepository = {
  createContactMessage,
  findContactMessageById,
  findAllContactMessages,
  updateContactMessage,
  deleteContactMessage,
  countContactMessages,
};
