// notice.routes.ts
import { Router } from 'express';
import { noticeController } from './notice.controller';
import { validateData } from '../../middlewares/validateData';
import { createNoticeSchema, updateNoticeSchema } from './notice.validation';

const router = Router();

router.post(
  '/',
  validateData(createNoticeSchema),
  noticeController.createNotice
  /*
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/CreateNotice" }
  }
  #swagger.responses[201] = {
    schema: { $ref: "#/components/schemas/NoticeResponse" }
  }
  */
);

router.get(
  '/',
  noticeController.getAllNotices
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/NoticesResponse" }
  }
  */
);

router.get(
  '/:id',
  noticeController.getNoticeById
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/NoticeResponse" }
  }
  */
);

router.put(
  '/:id',
  validateData(updateNoticeSchema),
  noticeController.updateNotice
  /*
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/CreateNotice" }
  }
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/NoticeResponse" }
  }
  */
);

router.delete(
  '/:id',
  noticeController.deleteNotice
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/NoticeResponse" }
  }
  */
);

export const noticeRoutes = router;
