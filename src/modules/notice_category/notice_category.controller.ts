import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { noticeCategoryService } from './notice_category.service';

const createNoticeCategory = async (req: Request, res: Response) => {
  const result = await noticeCategoryService.createNoticeCategory(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Notice category created successfully',
    data: result,
  });
};

const getAllNoticeCategories = async (req: Request, res: Response) => {
  const { search = '', page = 1, limit = 10 } = req.query;

  const result = await noticeCategoryService.getAllNoticeCategories(
    search as string,
    Number(page),
    Number(limit)
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Notice categories retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
};

const getNoticeCategoryById = async (req: Request, res: Response) => {
  const result = await noticeCategoryService.getNoticeCategoryById(Number(req.params.id));

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Notice category retrieved successfully',
    data: result,
  });
};

const updateNoticeCategoryById = async (req: Request, res: Response) => {
  const result = await noticeCategoryService.updateNoticeCategoryById(
    Number(req.params.id),
    req.body
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Notice category updated successfully',
    data: result,
  });
};

const deleteNoticeCategoryById = async (req: Request, res: Response) => {
  const result = await noticeCategoryService.deleteNoticeCategoryById(Number(req.params.id));

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Notice category deleted successfully',
    data: result,
  });
};

export const noticeCategoryController = {
  createNoticeCategory,
  getAllNoticeCategories,
  getNoticeCategoryById,
  updateNoticeCategoryById,
  deleteNoticeCategoryById,
};
