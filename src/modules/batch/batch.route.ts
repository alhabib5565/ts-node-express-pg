// batch.routes.ts
import { Router } from 'express';
import { batchController } from './batch.controller';
import { validateData } from '../../middlewares/validateData';
import { createBatchSchema, updateBatchSchema } from './batch.validation';

const router = Router();

router.post(
  '/',
  validateData(createBatchSchema),
  batchController.createBatch
  /*
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/CreateBatch" }
  }
  #swagger.responses[201] = {
    schema: { $ref: "#/components/schemas/BatchResponse" }
  }
  */
);

router.get(
  '/',
  batchController.getAllBatches
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/BatchesResponse" }
  }
  */
);

router.get(
  '/:id',
  batchController.getBatchById
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/BatchResponse" }
  }
  */
);

router.put(
  '/:id',
  validateData(updateBatchSchema),
  batchController.updateBatch
  /*
  #swagger.requestBody = {
    required: true,
    schema: { $ref: "#/components/schemas/CreateBatch" }
  }
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/BatchResponse" }
  }
  */
);

router.delete(
  '/:id',
  batchController.deleteBatch
  /*
  #swagger.responses[200] = {
    schema: { $ref: "#/components/schemas/BatchResponse" }
  }
  */
);

export const batchRoutes = router;
