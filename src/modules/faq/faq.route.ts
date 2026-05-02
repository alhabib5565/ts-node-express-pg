import { Router } from 'express';
import { faqController } from './faq.controller';
import { validateData } from '../../middlewares/validateData';
import { createFaqSchema, updateFaqSchema } from './faq.validation';

const router = Router();

router.post(
  '/',
  /*
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/CreateFaq" }
  }
  #swagger.responses[201] = {
    schema: { $ref: "#/components/schemas/FaqResponse" }
  }
*/
  validateData(createFaqSchema),
  faqController.createFaq
);
router.get(
  '/',
  /*#swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/FaqsResponse" }
  }*/
  faqController.getAllFaqs
);
router.get(
  '/:id',
  /*#swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/FaqResponse" }
  }*/
  faqController.getFaqById
);
router.put(
  '/:id',
  /*#swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/FaqResponse" }
  }*/
  validateData(updateFaqSchema),
  faqController.updateFaq
);
router.delete(
  '/:id',
  /*#swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/FaqResponse" }
  }*/
  faqController.deleteFaq
);

export const faqRoutes = router;
