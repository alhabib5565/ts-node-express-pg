import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendSuccessResponse';
import httpStatus from 'http-status';
import { noticeService } from './notice.service';

const createNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await noticeService.createNewNotice(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Notice created successfully',
    data: result,
  });
});

const getAllNotices = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await noticeService.getAllNotices(req.query);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Notices retrieved successfully',
    meta,
    data,
  });
});

const getNoticeById = catchAsync(async (req: Request, res: Response) => {
  const result = await noticeService.getNoticeById(req.params.id || '');

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Notice retrieved successfully',
    data: result,
  });
});

const updateNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await noticeService.updateNoticeById(req.params.id || '', req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Notice updated successfully',
    data: result,
  });
});

const deleteNotice = catchAsync(async (req: Request, res: Response) => {
  const result = await noticeService.deleteNoticeById(req.params.id || '');

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Notice deleted successfully',
    data: result,
  });
});

export const noticeController = {
  createNotice,
  getAllNotices,
  getNoticeById,
  updateNotice,
  deleteNotice,
};
