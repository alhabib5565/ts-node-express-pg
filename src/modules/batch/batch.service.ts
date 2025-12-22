import { IBatch } from './batch.interface';
import { batchRepository } from './batch.repository';

const createNewBatch = async (batchData: IBatch) => {
  return await batchRepository.createBatch(batchData);
};

const getBatchById = async (id: string) => {
  const batch = await batchRepository.findBatchById(id);
  if (!batch) throw new Error('Batch not found');
  return batch;
};

const getAllBatches = async (query: Record<string, any>) => {
  const { page = 1, limit = 10, search = '' } = query;
  const offset = (page - 1) * limit;

  const [data, total] = await Promise.all([
    batchRepository.findAllBatches(limit, offset, search),
    batchRepository.countBatches(),
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

const updateBatchById = async (id: string, batchData: Partial<IBatch>) => {
  const exists = await batchRepository.findBatchById(id);
  if (!exists) throw new Error('Batch not found');

  const updated = await batchRepository.updateBatch(id, batchData);
  if (!updated) throw new Error('Update failed');

  return updated;
};

const deleteBatchById = async (id: string) => {
  const exists = await batchRepository.findBatchById(id);
  if (!exists) throw new Error('Batch not found');

  const deleted = await batchRepository.deleteBatch(id);
  if (!deleted) throw new Error('Delete failed');

  return { message: 'Batch deleted successfully' };
};

export const batchService = {
  createNewBatch,
  getBatchById,
  getAllBatches,
  updateBatchById,
  deleteBatchById,
};
