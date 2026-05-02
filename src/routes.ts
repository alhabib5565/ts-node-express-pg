import express from 'express';
import { userRoutes } from './modules/user/user.route';
import { authRoutes } from './modules/auth/auth.route';
import { batchRoutes } from './modules/batch/batch.route';
import { courseCategoryRoutes } from './modules/course_category/course_category.route';
import { faqRoutes } from './modules/faq/faq.route';
import { courseRoutes } from './modules/course/course.route';
import { noticeCategoryRoutes } from './modules/notice_category/notice_category.route';
import { noticeRoutes } from './modules/notice/notice.route';
// import { contactMessageRoutes } from './modules/contact-message/contact-message.route';
// import { branchRoutes } from './modules/branch/branch.route';
// import { siteConfigRoutes } from './modules/site-config/site-config.route';

const router = express();

router.use(
  '/batches',
  // #swagger.tags = ['Batches']
  batchRoutes
);
router.use(
  '/course-categories',
  // #swagger.tags = ['Course Categories']
  courseCategoryRoutes
);
router.use(
  '/faqs', // #swagger.tags = ['FAQs']
  faqRoutes
);
router.use(
  '/notice-categories',
  // #swagger.tags = ['Notice Categories']
  noticeCategoryRoutes
);
router.use(
  '/notices',
  // #swagger.tags = ['Notices']
  noticeRoutes
);
router.use(
  '/courses',
  // #swagger.tags = ['Courses']
  courseRoutes
);
router.use(
  '/users',
  //#swagger.tags = ['Users']
  userRoutes
);
router.use(
  '/auth',
  // #swagger.tags = ['Auth']
  authRoutes
);
// router.use(
//   '/contact-messages',
//   // #swagger.tags = ['Contact Messages']
//   contactMessageRoutes
// );
// router.use(
//   '/branches',
//   // #swagger.tags = ['Branches']
//   branchRoutes
// );
// router.use(
//   '/site-config',
//   // #swagger.tags = ['Site Config']
//   siteConfigRoutes
// );

export const appRoutes = router;
