import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendSuccessResponse';
import httpStatus from 'http-status';
import { batchService } from './batch.service';

const createBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await batchService.createNewBatch(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Batch created successfully',
    data: result,
  });
});

const getAllBatches = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await batchService.getAllBatches(req.query);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Batches retrieved successfully',
    meta,
    data,
  });
});

const getBatchById = catchAsync(async (req: Request, res: Response) => {
  const result = await batchService.getBatchById(req.params.id || '');

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Batch retrieved successfully',
    data: result,
  });
});

const updateBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await batchService.updateBatchById(req.params.id || '', req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Batch updated successfully',
    data: result,
  });
});

const deleteBatch = catchAsync(async (req: Request, res: Response) => {
  const result = await batchService.deleteBatchById(req.params.id || '');

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Batch deleted successfully',
    data: result,
  });
});

export const batchController = {
  createBatch,
  getAllBatches,
  getBatchById,
  updateBatch,
  deleteBatch,
};
