//==========================================
// 7. user.route.ts
// কেন: API endpoints define করার জন্য
// ==========================================

import { Router } from 'express';
import { validateData } from '../../middlewares/validateData';
import { userController } from './user.controller';
import { createUserSchema, updateUserSchema } from './user.validation';

const router = Router();

// Routes
router.post('/', validateData(createUserSchema), userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', validateData(updateUserSchema), userController.updateUser);

router.delete('/:id', userController.deleteUser);

export const userRoutes = router;
