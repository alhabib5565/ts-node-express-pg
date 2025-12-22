import { ICourseCategory } from './course_category.interface';
import { courseCategoryRepository } from './course_category.repository';

const createCourseCategory = async (payload: ICourseCategory) => {
  return await courseCategoryRepository.createCourseCategory(payload);
};

const getAllCourseCategories = async (search: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const data = await courseCategoryRepository.getAllCourseCategories(search, limit, offset);

  const total = await courseCategoryRepository.countCourseCategories(search);

  return {
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
    data,
  };
};

const getCourseCategoryById = async (id: number) => {
  const result = await courseCategoryRepository.getCourseCategoryById(id);

  return result || null;
};

const updateCourseCategoryById = async (id: number, payload: Partial<ICourseCategory>) => {
  return await courseCategoryRepository.updateCourseCategoryById(id, payload);
};

const deleteCourseCategoryById = async (id: number) => {
  return await courseCategoryRepository.deleteCourseCategoryById(id);
};

export const courseCategoryService = {
  createCourseCategory,
  getAllCourseCategories,
  getCourseCategoryById,
  updateCourseCategoryById,
  deleteCourseCategoryById,
};
