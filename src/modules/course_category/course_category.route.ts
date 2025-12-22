import { Router } from 'express';
import { validateData } from '../../middlewares/validateData';
import { courseCategoryController } from './course_category.controller';
import {
  createCourseCategorySchema,
  updateCourseCategorySchema,
} from './course_category.validation';

const router = Router();

router.post(
  '/',
  validateData(createCourseCategorySchema),
  courseCategoryController.createCourseCategory
);

router.get('/', courseCategoryController.getAllCourseCategories);

router.get('/:id', courseCategoryController.getCourseCategoryById);

router.put(
  '/:id',
  validateData(updateCourseCategorySchema),
  courseCategoryController.updateCourseCategoryById
);

router.delete('/:id', courseCategoryController.deleteCourseCategoryById);

export const courseCategoryRoutes = router;
