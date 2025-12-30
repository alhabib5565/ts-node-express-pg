import { Router } from 'express';
import { branchController } from './branch.controller';
import { validateData } from '../../middlewares/validateData';
import { createBranchSchema, updateBranchSchema } from './branch.validation';

const router = Router();

router.post('/', validateData(createBranchSchema), branchController.createBranch);
router.get('/', branchController.getAllBranches);
router.get('/:id', branchController.getBranchById);
router.put('/:id', validateData(updateBranchSchema), branchController.updateBranch);
router.delete('/:id', branchController.deleteBranch);

export const branchRoutes = router;
