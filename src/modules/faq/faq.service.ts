import { IFaq } from './faq.interface';
import { faqRepository } from './faq.repository';

const createNewFaq = async (faqData: IFaq) => {
  return await faqRepository.createFaq(faqData);
};

const getFaqById = async (id: string) => {
  const faq = await faqRepository.findFaqById(id);
  if (!faq) throw new Error('FAQ not found');
  return faq;
};

const getAllFaqs = async (page: number = 1, limit: number = 10) => {
  const offset = (page - 1) * limit;

  const [data, total] = await Promise.all([
    faqRepository.findAllFaqs(limit, offset),
    faqRepository.countFaqs(),
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

const updateFaqById = async (id: string, faqData: Partial<IFaq>) => {
  const exists = await faqRepository.findFaqById(id);
  if (!exists) throw new Error('FAQ not found');

  const updated = await faqRepository.updateFaq(id, faqData);
  if (!updated) throw new Error('Update failed');

  return updated;
};

const deleteFaqById = async (id: string) => {
  const exists = await faqRepository.findFaqById(id);
  if (!exists) throw new Error('FAQ not found');

  const deleted = await faqRepository.deleteFaq(id);
  if (!deleted) throw new Error('Delete failed');

  return { message: 'FAQ deleted successfully' };
};

export const faqService = {
  createNewFaq,
  getFaqById,
  getAllFaqs,
  updateFaqById,
  deleteFaqById,
};
