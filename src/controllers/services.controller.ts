import { Request, Response } from 'express';
import { servicesQuery } from '../queries/services.query';
import response from '../utils/response.util';

export async function getServices(req: Request, res: Response) {
  try {
    const services = await servicesQuery.getServices();

    return response.success(res, 200, 'Success to get services', services);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return response.nonSuccess(res, 500, error.message);
    } else {
      return response.nonSuccess(res, 500, 'Internal server error');
    }
  }
}
