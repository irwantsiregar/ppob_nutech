import { Request, Response } from 'express';
import { bannersQuery } from '../queries/banners.query';
import { returnSuccess, returnNonSuccess } from '../utils/response.util';

export async function getBanners(req: Request, res: Response) {
  try {
    const banners = await bannersQuery.getBanners();

    returnSuccess(req, res, 200, 'Success to get services', banners);
  } catch (error: unknown) {
    if (error instanceof Error) {
      returnNonSuccess(req, res, 500, error.message);
    } else {
      returnNonSuccess(req, res, 500, 'Internal server error');
    }
  }
}
