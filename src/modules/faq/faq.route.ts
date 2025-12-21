import { Router } from 'express';
import { faqController } from './faq.controller';
import { validateData } from '../../middlewares/validateData';
import { createFaqSchema, updateFaqSchema } from './faq.validation';

const router = Router();

router.post('/', validateData(createFaqSchema), faqController.createFaq);
router.get('/', faqController.getAllFaqs);
router.get('/:id', faqController.getFaqById);
router.put('/:id', validateData(updateFaqSchema), faqController.updateFaq);
router.delete('/:id', faqController.deleteFaq);

export const faqRoutes = router;
