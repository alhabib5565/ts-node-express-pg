// course.controller.ts
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendSuccessResponse';
import { courseService } from './course.service';

const createCourse = catchAsync(async (req, res) => {
  const result = await courseService.createCourse(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.CREATED,
    message: 'Course created successfully',
    data: result,
  });
});

const getAllCourses = catchAsync(async (req, res) => {
  const result = await courseService.getAllCourses(req.query);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Courses retrieved successfully',
    data: result,
  });
});

const getCourseById = catchAsync(async (req, res) => {
  const result = await courseService.getCourseById(Number(req.params.id));

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Course retrieved successfully',
    data: result,
  });
});

const updateCourse = catchAsync(async (req, res) => {
  const result = await courseService.updateCourse(Number(req.params.id), req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Course updated successfully',
    data: result,
  });
});

const deleteCourse = catchAsync(async (req, res) => {
  const result = await courseService.deleteCourse(Number(req.params.id));

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Course deleted successfully',
    data: result,
  });
});

export const courseController = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
