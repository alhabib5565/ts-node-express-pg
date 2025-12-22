import { INoticeCategory } from './notice_category.interface';
import { noticeCategoryRepository } from './notice_category.repository';

const createNoticeCategory = async (payload: INoticeCategory) => {
  return await noticeCategoryRepository.createNoticeCategory(payload);
};

const getAllNoticeCategories = async (search: string, page: number, limit: number) => {
  const offset = (page - 1) * limit;

  const data = await noticeCategoryRepository.getAllNoticeCategories(search, limit, offset);

  const total = await noticeCategoryRepository.countNoticeCategories(search);

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

const getNoticeCategoryById = async (id: number) => {
  const result = await noticeCategoryRepository.getNoticeCategoryById(id);

  return result || null;
};

const updateNoticeCategoryById = async (id: number, payload: Partial<INoticeCategory>) => {
  return await noticeCategoryRepository.updateNoticeCategoryById(id, payload);
};

const deleteNoticeCategoryById = async (id: number) => {
  return await noticeCategoryRepository.deleteNoticeCategoryById(id);
};

export const noticeCategoryService = {
  createNoticeCategory,
  getAllNoticeCategories,
  getNoticeCategoryById,
  updateNoticeCategoryById,
  deleteNoticeCategoryById,
};
