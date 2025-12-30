import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendSuccessResponse';
import httpStatus from 'http-status';
import { branchService } from './branch.service';

const createBranch = catchAsync(async (req: Request, res: Response) => {
  const result = await branchService.createNewBranch(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Branch created successfully',
    data: result,
  });
});

const getAllBranches = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await branchService.getAllBranches(req.query);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Branches retrieved successfully',
    meta,
    data,
  });
});

const getBranchById = catchAsync(async (req: Request, res: Response) => {
  const result = await branchService.getBranchById(req.params.id || '');

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Branch retrieved successfully',
    data: result,
  });
});

const updateBranch = catchAsync(async (req: Request, res: Response) => {
  const result = await branchService.updateBranchById(req.params.id || '', req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Branch updated successfully',
    data: result,
  });
});

const deleteBranch = catchAsync(async (req: Request, res: Response) => {
  const result = await branchService.deleteBranchById(req.params.id || '');

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Branch deleted successfully',
    data: result,
  });
});

export const branchController = {
  createBranch,
  getAllBranches,
  getBranchById,
  updateBranch,
  deleteBranch,
};
