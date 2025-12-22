import express from 'express';
import { userRoutes } from './modules/user/user.route';
import { authRoutes } from './modules/auth/auth.route';
import { batchRoutes } from './modules/batch/batch.route';
import { courseCategoryRoutes } from './modules/course_category/course_category.route';
import { faqRoutes } from './modules/faq/faq.route';
import { courseRoutes } from './modules/course/course.route';
import { noticeCategoryRoutes } from './modules/notice_category/notice_category.route';

const router = express();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/batches', batchRoutes);
router.use('/course-categories', courseCategoryRoutes);
router.use('/faqs', faqRoutes);
router.use('/courses', courseRoutes);
router.use('/notice-categories', noticeCategoryRoutes);

export const appRoutes = router;
