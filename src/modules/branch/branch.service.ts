import { IBranch } from './branch.interface';
import { branchRepository } from './branch.repository';

const createNewBranch = async (branchData: IBranch) => {
  return await branchRepository.createBranch(branchData);
};

const getBranchById = async (id: string) => {
  const branch = await branchRepository.findBranchById(id);
  if (!branch) throw new Error('Branch not found');
  return branch;
};

const getAllBranches = async (query: Record<string, any>) => {
  const { page = 1, limit = 10, search = '' } = query;
  const offset = (page - 1) * limit;

  const [data, total] = await Promise.all([
    branchRepository.findAllBranches(limit, offset, search),
    branchRepository.countBranches(),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateBranchById = async (id: string, branchData: Partial<IBranch>) => {
  const exists = await branchRepository.findBranchById(id);
  if (!exists) throw new Error('Branch not found');

  const updated = await branchRepository.updateBranch(id, branchData);
  if (!updated) throw new Error('Update failed');

  return updated;
};

const deleteBranchById = async (id: string) => {
  const exists = await branchRepository.findBranchById(id);
  if (!exists) throw new Error('Branch not found');

  const deleted = await branchRepository.deleteBranch(id);
  if (!deleted) throw new Error('Delete failed');

  return { message: 'Branch deleted successfully' };
};

export const branchService = {
  createNewBranch,
  getBranchById,
  getAllBranches,
  updateBranchById,
  deleteBranchById,
};
