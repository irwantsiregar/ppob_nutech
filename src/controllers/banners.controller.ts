import { Request, Response } from 'express';
import { bannersQuery } from '../queries/banners.query';
import response from '../utils/response.util';

export async function getBanners(req: Request, res: Response) {
  try {
    const banners = await bannersQuery.getBanners();

    return response.success(res, 200, 'Success to get services', banners);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.nonSuccess(res, 500, error.message);
    } else {
      return response.nonSuccess(res, 500, 'Internal server error');
    }
  }
}
