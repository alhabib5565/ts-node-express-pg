import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendSuccessResponse';
import httpStatus from 'http-status';
import { contactMessageService } from './contact-message.service';

const createContactMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await contactMessageService.createNewContactMessage(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contact message created successfully',
    data: result,
  });
});

const getAllContactMessages = catchAsync(async (req: Request, res: Response) => {
  const { data, meta } = await contactMessageService.getAllContactMessages(req.query);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contact messages retrieved successfully',
    meta,
    data,
  });
});

const getContactMessageById = catchAsync(async (req: Request, res: Response) => {
  const result = await contactMessageService.getContactMessageById(req.params.id || '');

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contact message retrieved successfully',
    data: result,
  });
});

const updateContactMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await contactMessageService.updateContactMessageById(req.params.id || '', req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contact message updated successfully',
    data: result,
  });
});

const deleteContactMessage = catchAsync(async (req: Request, res: Response) => {
  const result = await contactMessageService.deleteContactMessageById(req.params.id || '');

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Contact message deleted successfully',
    data: result,
  });
});

export const contactMessageController = {
  createContactMessage,
  getAllContactMessages,
  getContactMessageById,
  updateContactMessage,
  deleteContactMessage,
};
