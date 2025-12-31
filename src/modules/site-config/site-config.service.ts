import { ISiteConfig } from './site-config.interface';
import { siteConfigRepository } from './site-config.repository';

const createNewSiteConfig = async (siteConfigData: ISiteConfig) => {
  const existing = await siteConfigRepository.findSiteConfig();
  if (existing) {
    throw new Error('Site configuration already exists. Please use update instead.');
  }
  return await siteConfigRepository.createSiteConfig(siteConfigData);
};

const getSiteConfig = async () => {
  const siteConfig = await siteConfigRepository.findSiteConfig();
  if (!siteConfig) throw new Error('Site configuration not found');
  return siteConfig;
};

const updateSiteConfig = async (siteConfigData: Partial<ISiteConfig>) => {
  const exists = await siteConfigRepository.findSiteConfig();
  if (!exists) throw new Error('Site configuration not found');

  const updated = await siteConfigRepository.updateSiteConfig(siteConfigData);
  if (!updated) throw new Error('Update failed');

  return updated;
};

export const siteConfigService = {
  createNewSiteConfig,
  getSiteConfig,
  updateSiteConfig,
};
