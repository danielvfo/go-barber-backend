import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

function ensureAuthentication(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  const authorizationHeader = request.headers.authorization;

  if (!authorizationHeader) {
    throw new AppError('Missing authorization.', 401);
  }

  const [, token] = authorizationHeader.split(' ');

  try {
    const verifiedToken = verify(token, authConfig.jwt.secret);

    const { sub } = verifiedToken as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch {
    throw new AppError('Invalid authorization token.', 401);
  }
}

export default ensureAuthentication;
