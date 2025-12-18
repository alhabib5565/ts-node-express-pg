import express from 'express';
import { userRoutes } from './modules/user/user.route';
// import userRoutes from './modules/user/user.route';

const router = express();

router.use('/users', userRoutes);

export const appRoutes = router;
