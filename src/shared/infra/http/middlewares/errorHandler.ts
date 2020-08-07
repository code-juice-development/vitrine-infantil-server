import { Request, Response, NextFunction } from 'express';

import AppError from '@shared/errors/AppError';

const errorHandler = (error: Error, request: Request, response: Response, _: NextFunction) => {
  if(error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    });
  }

  console.log(error);

  return response.status(500).json({
    status: 'Error',
    message: 'Internal Server Error'
  });
};

export default errorHandler;