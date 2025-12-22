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
);
router.get('/', noticeCategoryController.getAllNoticeCategories);
router.get('/:id', noticeCategoryController.getNoticeCategoryById);
router.put(
  '/:id',
  validateData(updateNoticeCategorySchema),
  noticeCategoryController.updateNoticeCategoryById
);
router.delete('/:id', noticeCategoryController.deleteNoticeCategoryById);

export const noticeCategoryRoutes = router;
