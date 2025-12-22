// course.route.ts
import { Router } from 'express';
import { courseController } from './course.controller';
import { validateData } from '../../middlewares/validateData';
import { createCourseSchema, updateCourseSchema } from './course.validation';

const router = Router();

router.post('/', validateData(createCourseSchema), courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', validateData(updateCourseSchema), courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

export const courseRoutes = router;
