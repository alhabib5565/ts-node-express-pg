import express from 'express';
import { userRoutes } from './modules/user/user.route';
import { authRoutes } from './modules/auth/auth.route';
import { batchRoutes } from './modules/batch/batch.route';
import { courseCategoryRoutes } from './modules/course_category/course_category.route';
import { faqRoutes } from './modules/faq/faq.route';
import { courseRoutes } from './modules/course/course.route';
import { noticeCategoryRoutes } from './modules/notice_category/notice_category.route';
import { noticeRoutes } from './modules/notice/notice.route';
import { contactMessageRoutes } from './modules/contact-message/contact-message.route';
import { branchRoutes } from './modules/branch/branch.route';

const router = express();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/batches', batchRoutes);
router.use('/course-categories', courseCategoryRoutes);
router.use('/faqs', faqRoutes);
router.use('/courses', courseRoutes);
router.use('/notice-categories', noticeCategoryRoutes);
router.use('/notices', noticeRoutes);
router.use('/contact-messages', contactMessageRoutes);
router.use('/branches', branchRoutes);

export const appRoutes = router;
