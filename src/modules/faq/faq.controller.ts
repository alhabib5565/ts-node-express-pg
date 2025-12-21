import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendSuccessResponse';
import httpStatus from 'http-status';
import { faqService } from './faq.service';

const createFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqService.createNewFaq(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ created successfully',
    data: result,
  });
});

const getAllFaqs = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await faqService.getAllFaqs();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'FAQs retrieved successfully',
    meta,
    data,
  });
});

const getFaqById = catchAsync(async (req: Request, res: Response) => {
  const result = await faqService.getFaqById(req.params.id || '');

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ retrieved successfully',
    data: result,
  });
});

const updateFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqService.updateFaqById(req.params.id || '', req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ updated successfully',
    data: result,
  });
});

const deleteFaq = catchAsync(async (req: Request, res: Response) => {
  const result = await faqService.deleteFaqById(req.params.id || '');

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'FAQ deleted successfully',
    data: result,
  });
});

export const faqController = {
  createFaq,
  getAllFaqs,
  getFaqById,
  updateFaq,
  deleteFaq,
};
