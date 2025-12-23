import { Router } from 'express';
import { noticeController } from './notice.controller';
import { validateData } from '../../middlewares/validateData';
import { createNoticeSchema, updateNoticeSchema } from './notice.validation';

const router = Router();

router.post('/', validateData(createNoticeSchema), noticeController.createNotice);
router.get('/', noticeController.getAllNotices);
router.get('/:id', noticeController.getNoticeById);
router.put('/:id', validateData(updateNoticeSchema), noticeController.updateNotice);
router.delete('/:id', noticeController.deleteNotice);

export const noticeRoutes = router;
