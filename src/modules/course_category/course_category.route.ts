// course_category.routes.ts
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
  courseCategoryController.getAllCourseCategories
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/CategoriesResponse" }
  }
  */
);

router.get(
  '/:id',
  courseCategoryController.getCourseCategoryById
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/CategoryResponse" }
  }
  */
);

router.put(
  '/:id',
  validateData(updateCourseCategorySchema),
  courseCategoryController.updateCourseCategoryById
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
  courseCategoryController.deleteCourseCategoryById
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/CategoryResponse" }
  }
  */
);

export const courseCategoryRoutes = router;
