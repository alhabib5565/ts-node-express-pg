import { INotice } from './notice.interface';
import { noticeRepository } from './notice.repository';

const createNewNotice = async (noticeData: INotice) => {
  return await noticeRepository.createNotice(noticeData);
};

const getNoticeById = async (id: string) => {
  const notice = await noticeRepository.findNoticeById(id);
  return notice || null;
};

const getAllNotices = async (query: Record<string, any>) => {
  const { page = 1, limit = 10, search = '' } = query;
  const offset = (page - 1) * limit;

  const [data, total] = await Promise.all([
    noticeRepository.findAllNotices(limit, offset, search),
    noticeRepository.countNotices(),
  ]);

  return {
    data,
    meta: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

const updateNoticeById = async (id: string, noticeData: Partial<INotice>) => {
  const exists = await noticeRepository.findNoticeById(id);
  if (!exists) throw new Error('Notice not found');

  const updated = await noticeRepository.updateNotice(id, noticeData);
  if (!updated) throw new Error('Update failed');

  return updated;
};

const deleteNoticeById = async (id: string) => {
  const exists = await noticeRepository.findNoticeById(id);
  if (!exists) throw new Error('Notice not found');

  const deleted = await noticeRepository.deleteNotice(id);
  if (!deleted) throw new Error('Delete failed');

  return { message: 'Notice deleted successfully' };
};

export const noticeService = {
  createNewNotice,
  getNoticeById,
  getAllNotices,
  updateNoticeById,
  deleteNoticeById,
};
