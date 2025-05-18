import { Request, Response } from 'express';
import { servicesQuery } from '../queries/services.query';
import { returnSuccess, returnNonSuccess } from '../utils/response.util';

export async function getServices(req: Request, res: Response) {
  try {
    const services = await servicesQuery.getServices();

    returnSuccess(req, res, 200, 'Success to get services', services);
  } catch (error: unknown) {
    if (error instanceof Error) {
      returnNonSuccess(req, res, 500, error.message);
    } else {
      returnNonSuccess(req, res, 500, 'Internal server error');
    }
  }
}
