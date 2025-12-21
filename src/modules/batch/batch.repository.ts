import pool from '../../config/database';
import { IBatch } from './batch.interface';

const createBatch = async (batchData: IBatch): Promise<IBatch> => {
  const query = `
    INSERT INTO batches (name, description, day, time, is_active)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;

  const values = [
    batchData.name,
    batchData.description ?? null,
    batchData.day,
    batchData.time,
    batchData.is_active ?? true,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const findBatchById = async (id: string): Promise<IBatch | null> => {
  const result = await pool.query(`SELECT * FROM batches WHERE id = $1`, [id]);
  return result.rows[0] ?? null;
};

const findAllBatches = async (limit: number = 10, offset: number = 0): Promise<IBatch[]> => {
  const query = `
    SELECT * FROM batches
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;
  const result = await pool.query(query, [limit, offset]);
  return result.rows;
};

const updateBatch = async (id: string, batchData: Partial<IBatch>): Promise<IBatch | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let param = 1;

  if (batchData.name !== undefined) {
    fields.push(`name = $${param++}`);
    values.push(batchData.name);
  }
  if (batchData.description !== undefined) {
    fields.push(`description = $${param++}`);
    values.push(batchData.description);
  }
  if (batchData.day !== undefined) {
    fields.push(`day = $${param++}`);
    values.push(batchData.day);
  }
  if (batchData.time !== undefined) {
    fields.push(`time = $${param++}`);
    values.push(batchData.time);
  }
  if (batchData.is_active !== undefined) {
    fields.push(`is_active = $${param++}`);
    values.push(batchData.is_active);
  }

  if (!fields.length) return null;

  values.push(id);

  const query = `
    UPDATE batches
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${param}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
};

const deleteBatch = async (id: string): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM batches WHERE id = $1`, [id]);
  return (result?.rowCount ?? 0) > 0;
};

const countBatches = async (): Promise<number> => {
  const result = await pool.query(`SELECT COUNT(*) AS total FROM batches`);
  return parseInt(result.rows[0].total);
};

export const batchRepository = {
  createBatch,
  findBatchById,
  findAllBatches,
  updateBatch,
  deleteBatch,
  countBatches,
};
