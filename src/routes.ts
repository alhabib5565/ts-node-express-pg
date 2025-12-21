import express from 'express';
import { userRoutes } from './modules/user/user.route';
import { authRoutes } from './modules/auth/auth.route';
import { batchRoutes } from './modules/batch/batch.route';

const router = express();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);
router.use('/batches', batchRoutes);

export const appRoutes = router;
