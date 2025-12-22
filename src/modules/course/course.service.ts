// course.service.ts
import { ICourse } from './course.interface';
import { courseRepository } from './course.repository';

const createCourse = async (payload: ICourse) => {
  return await courseRepository.createCourse(payload);
};

const getAllCourses = async (query: Record<string, any>) => {
  const [total, data] = await Promise.all([
    courseRepository.countCourses(),
    courseRepository.getAllCourses(query),
  ]);
  return {
    data,
    meta: {
      total,
      page: query.page || 1,
      limit: query.limit || 10,
      totalPages: Math.ceil(total / 10),
    },
  };
};

const getCourseById = async (id: number) => {
  const result = await courseRepository.getCourseById(id);
  return result || null;
};

const updateCourse = async (id: number, payload: Partial<ICourse>) => {
  const course = await courseRepository.getCourseById(id);
  if (!course) throw new Error('Course not found.');

  return await courseRepository.updateCourse(id, payload);
};

const deleteCourse = async (id: number) => {
  const course = await courseRepository.getCourseById(id);
  if (!course) throw new Error('Course not found.');
  return await courseRepository.deleteCourse(id);
};

export const courseService = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
};
