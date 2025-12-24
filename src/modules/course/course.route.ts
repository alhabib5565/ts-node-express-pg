// course.route.ts
import { NextFunction, Request, Response, Router } from 'express';
import { courseController } from './course.controller';
import { validateData } from '../../middlewares/validateData';
import { createCourseSchema, updateCourseSchema } from './course.validation';
import { upload } from '../../utils/uploadFile';

const router = Router();

router.post(
  '/',
  upload.single('file'), // ami validation korar age file upload korar korbo body er vitor thumtail e path add kore dite pari ja validate data diye validation kora hobe tai validation middleware er age upload use korchi
  (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }
    req.body = { ...JSON.parse(req.body?.course_info), thumbnail: `/uploads/${req.file.filename}` };
    next();
  },
  validateData(createCourseSchema),
  courseController.createCourse
);
router.get('/', courseController.getAllCourses);
router.get('/:id', courseController.getCourseById);
router.put('/:id', validateData(updateCourseSchema), courseController.updateCourse);
router.delete('/:id', courseController.deleteCourse);

export const courseRoutes = router;
