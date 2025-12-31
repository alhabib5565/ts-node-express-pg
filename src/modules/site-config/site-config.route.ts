import { Router } from 'express';
import { siteConfigController } from './site-config.controller';
import { validateData } from '../../middlewares/validateData';
import { createSiteConfigSchema, updateSiteConfigSchema } from './site-config.validation';

const router = Router();

router.post('/', validateData(createSiteConfigSchema), siteConfigController.createSiteConfig);
router.get('/', siteConfigController.getSiteConfig);
router.put('/', validateData(updateSiteConfigSchema), siteConfigController.updateSiteConfig);

export const siteConfigRoutes = router;
