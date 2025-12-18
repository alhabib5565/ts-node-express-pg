import express from 'express';
import { userRoutes } from './modules/user/user.route';
import { authRoutes } from './modules/auth/auth.route';

const router = express();

router.use('/users', userRoutes);
router.use('/auth', authRoutes);

export const appRoutes = router;
