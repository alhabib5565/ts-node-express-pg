import { Router } from 'express';
import { contactMessageController } from './contact-message.controller';
import { validateData } from '../../middlewares/validateData';
import { createContactMessageSchema, updateContactMessageSchema } from './contact-message.validation';

const router = Router();

router.post('/', validateData(createContactMessageSchema), contactMessageController.createContactMessage);
router.get('/', contactMessageController.getAllContactMessages);
router.get('/:id', contactMessageController.getContactMessageById);
router.put('/:id', validateData(updateContactMessageSchema), contactMessageController.updateContactMessage);
router.delete('/:id', contactMessageController.deleteContactMessage);

export const contactMessageRoutes = router;
