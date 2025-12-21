import { Router } from 'express';
import { batchController } from './batch.controller';
import { validateData } from '../../middlewares/validateData';
import { createBatchSchema, updateBatchSchema } from './batch.validation';

const router = Router();

router.post('/', validateData(createBatchSchema), batchController.createBatch);
router.get('/', batchController.getAllBatches);
router.get('/:id', batchController.getBatchById);
router.put('/:id', validateData(updateBatchSchema), batchController.updateBatch);
router.delete('/:id', batchController.deleteBatch);

export const batchRoutes = router;
