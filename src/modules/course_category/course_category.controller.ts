import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { courseCategoryService } from './course_category.service';

const createCourseCategory = async (req: Request, res: Response) => {
  const result = await courseCategoryService.createCourseCategory(req.body);

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Course category created successfully',
    data: result,
  });
};

const getAllCourseCategories = async (req: Request, res: Response) => {
  const { search = '', page = 1, limit = 10 } = req.query;

  const result = await courseCategoryService.getAllCourseCategories(
    search as string,
    Number(page),
    Number(limit)
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course categories retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
};

const getCourseCategoryById = async (req: Request, res: Response) => {
  const result = await courseCategoryService.getCourseCategoryById(Number(req.params.id));

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course category retrieved successfully',
    data: result,
  });
};

const updateCourseCategoryById = async (req: Request, res: Response) => {
  const result = await courseCategoryService.updateCourseCategoryById(
    Number(req.params.id),
    req.body
  );

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course category updated successfully',
    data: result,
  });
};

const deleteCourseCategoryById = async (req: Request, res: Response) => {
  const result = await courseCategoryService.deleteCourseCategoryById(Number(req.params.id));

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Course category deleted successfully',
    data: result,
  });
};

export const courseCategoryController = {
  createCourseCategory,
  getAllCourseCategories,
  getCourseCategoryById,
  updateCourseCategoryById,
  deleteCourseCategoryById,
};
