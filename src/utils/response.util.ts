import { Response } from 'express';

export default {
  success(res: Response, statusCode: number, message: string, data: unknown) {
    const returnResponse = {
      status: statusCode,
      message,
      data,
    };

    res.status(statusCode).json(returnResponse);
  },

  nonSuccess(res: Response, statusCode: number, message: string) {
    res.status(statusCode).json({ status: statusCode, message });
  },

  unauthorized(res: Response, message: string = 'Unauthorized', statusCode: number = 403) {
    res.status(statusCode).json({
      status: statusCode,
      message,
      data: null,
    });
  },
  notFound(res: Response, message: string = 'Not found', statusCode: number = 404) {
    res.status(statusCode).json({
      status: statusCode,
      message,
      data: null,
    });
  },
};
