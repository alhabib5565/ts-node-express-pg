import pool from '../../config/database';
import { IBranch } from './branch.interface';

const createBranch = async (branchData: IBranch): Promise<IBranch> => {
  const query = `
    INSERT INTO branches (name, address, city, area, phone, email, is_active, latitude, longitude)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
    RETURNING *
  `;

  const values = [
    branchData.name,
    branchData.address,
    branchData.city,
    branchData.area,
    branchData.phone,
    branchData.email,
    branchData.is_active ?? true,
    branchData.latitude,
    branchData.longitude,
  ];

  const result = await pool.query(query, values);
  return result.rows[0];
};

const findBranchById = async (id: string): Promise<IBranch | null> => {
  const result = await pool.query(`SELECT * FROM branches WHERE id = $1`, [id]);
  return result.rows[0] ?? null;
};

const findAllBranches = async (limit: number, offset: number, search: string): Promise<IBranch[]> => {
  const query = `
    SELECT * FROM branches
    ${search ? `WHERE name ILIKE $3 OR city ILIKE $3 OR area ILIKE $3` : ''}
    ORDER BY created_at DESC
    LIMIT $1 OFFSET $2
  `;
  const params = search ? [limit, offset, `%${search}%`] : [limit, offset];
  const result = await pool.query(query, params);
  return result.rows;
};

const updateBranch = async (id: string, branchData: Partial<IBranch>): Promise<IBranch | null> => {
  const fields: string[] = [];
  const values: any[] = [];
  let param = 1;

  if (branchData.name !== undefined) {
    fields.push(`name = $${param++}`);
    values.push(branchData.name);
  }
  if (branchData.address !== undefined) {
    fields.push(`address = $${param++}`);
    values.push(branchData.address);
  }
  if (branchData.city !== undefined) {
    fields.push(`city = $${param++}`);
    values.push(branchData.city);
  }
  if (branchData.area !== undefined) {
    fields.push(`area = $${param++}`);
    values.push(branchData.area);
  }
  if (branchData.phone !== undefined) {
    fields.push(`phone = $${param++}`);
    values.push(branchData.phone);
  }
  if (branchData.email !== undefined) {
    fields.push(`email = $${param++}`);
    values.push(branchData.email);
  }
  if (branchData.is_active !== undefined) {
    fields.push(`is_active = $${param++}`);
    values.push(branchData.is_active);
  }
  if (branchData.latitude !== undefined) {
    fields.push(`latitude = $${param++}`);
    values.push(branchData.latitude);
  }
  if (branchData.longitude !== undefined) {
    fields.push(`longitude = $${param++}`);
    values.push(branchData.longitude);
  }

  if (!fields.length) return null;

  values.push(id);

  const query = `
    UPDATE branches
    SET ${fields.join(', ')}, updated_at = NOW()
    WHERE id = $${param}
    RETURNING *
  `;

  const result = await pool.query(query, values);
  return result.rows[0] ?? null;
};

const deleteBranch = async (id: string): Promise<boolean> => {
  const result = await pool.query(`DELETE FROM branches WHERE id = $1`, [id]);
  return (result.rowCount ?? 0) > 0;
};

const countBranches = async (): Promise<number> => {
  const result = await pool.query(`SELECT COUNT(*) AS total FROM branches`);
  return parseInt(result.rows[0].total);
};

export const branchRepository = {
  createBranch,
  findBranchById,
  findAllBranches,
  updateBranch,
  deleteBranch,
  countBranches,
};
