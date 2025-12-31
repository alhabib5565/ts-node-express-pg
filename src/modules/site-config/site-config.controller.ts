import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import sendSuccessResponse from '../../utils/sendSuccessResponse';
import httpStatus from 'http-status';
import { siteConfigService } from './site-config.service';

const createSiteConfig = catchAsync(async (req: Request, res: Response) => {
  const result = await siteConfigService.createNewSiteConfig(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Site configuration created successfully',
    data: result,
  });
});

const getSiteConfig = catchAsync(async (req: Request, res: Response) => {
  const result = await siteConfigService.getSiteConfig();

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Site configuration retrieved successfully',
    data: result,
  });
});

const updateSiteConfig = catchAsync(async (req: Request, res: Response) => {
  const result = await siteConfigService.updateSiteConfig(req.body);

  sendSuccessResponse(res, {
    statusCode: httpStatus.OK,
    message: 'Site configuration updated successfully',
    data: result,
  });
});

export const siteConfigController = {
  createSiteConfig,
  getSiteConfig,
  updateSiteConfig,
};
