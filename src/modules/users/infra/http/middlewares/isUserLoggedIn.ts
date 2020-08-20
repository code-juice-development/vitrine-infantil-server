import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

interface TokenPaylod {

  iat: number;

  exp: number;
  
  sub: string;

}

const isUserLoggedIn = (request: Request, response: Response, next: NextFunction): void => {
  const authorization = request.headers.authorization;

  if(!authorization) {
    throw new AppError('Você não está logado', 401);
  }

  const [, token] = authorization.split(' ');

  try {
    const { sub } = verify(token, String(process.env.SECRET)) as TokenPaylod;

    request.user = {
      id: sub
    };

    return next();
  } 
  catch (error) {
    throw new AppError('Token informado é inválido', 401);
  }
};

export default isUserLoggedIn;