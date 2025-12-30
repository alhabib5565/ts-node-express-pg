import { IContactMessage } from './contact-message.interface';
import { contactMessageRepository } from './contact-message.repository';

const createNewContactMessage = async (contactMessageData: IContactMessage) => {
  return await contactMessageRepository.createContactMessage(contactMessageData);
};

const getContactMessageById = async (id: string) => {
  const contactMessage = await contactMessageRepository.findContactMessageById(id);
  if (!contactMessage) throw new Error('Contact message not found');
  return contactMessage;
};

const getAllContactMessages = async (query: Record<string, any>) => {
  const { page = 1, limit = 10, search = '' } = query;
  const offset = (page - 1) * limit;

  const [data, total] = await Promise.all([
    contactMessageRepository.findAllContactMessages(limit, offset, search),
    contactMessageRepository.countContactMessages(),
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

const updateContactMessageById = async (id: string, contactMessageData: Partial<IContactMessage>) => {
  const exists = await contactMessageRepository.findContactMessageById(id);
  if (!exists) throw new Error('Contact message not found');

  const updated = await contactMessageRepository.updateContactMessage(id, contactMessageData);
  if (!updated) throw new Error('Update failed');

  return updated;
};

const deleteContactMessageById = async (id: string) => {
  const exists = await contactMessageRepository.findContactMessageById(id);
  if (!exists) throw new Error('Contact message not found');

  const deleted = await contactMessageRepository.deleteContactMessage(id);
  if (!deleted) throw new Error('Delete failed');

  return { message: 'Contact message deleted successfully' };
};

export const contactMessageService = {
  createNewContactMessage,
  getContactMessageById,
  getAllContactMessages,
  updateContactMessageById,
  deleteContactMessageById,
};
