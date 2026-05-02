// notice_category.routes.ts
import { Router } from 'express';
import { validateData } from '../../middlewares/validateData';
import { noticeCategoryController } from './notice_category.controller';
import {
  createNoticeCategorySchema,
  updateNoticeCategorySchema,
} from './notice_category.validation';

const router = Router();

router.post(
  '/',
  validateData(createNoticeCategorySchema),
  noticeCategoryController.createNoticeCategory
  /*
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/CreateCategory" }
  }
  #swagger.responses[201] = {
    schema: { $ref: "#/components/schemas/CategoryResponse" }
  }
  */
);

router.get(
  '/',
  noticeCategoryController.getAllNoticeCategories
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/CategoriesResponse" }
  }
  */
);

router.get(
  '/:id',
  noticeCategoryController.getNoticeCategoryById
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/CategoryResponse" }
  }
  */
);

router.put(
  '/:id',
  validateData(updateNoticeCategorySchema),
  noticeCategoryController.updateNoticeCategoryById
  /*
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/CreateCategory" }
  }
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/CategoryResponse" }
  }
  */
);

router.delete(
  '/:id',
  noticeCategoryController.deleteNoticeCategoryById
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/CategoryResponse" }
  }
  */
);

export const noticeCategoryRoutes = router;
