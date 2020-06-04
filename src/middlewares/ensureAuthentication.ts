import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

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
    throw new Error('Missing authorization.');
  }

  const [, token] = authorizationHeader.split(' ');

  try {
    const verifiedToken = verify(token, authConfig.jwt.secret);

    const { sub } = verifiedToken as TokenPayload;

    request.user = { id: sub };

    return next();
  } catch {
    throw new Error('Invalid authorization token.');
  }
}

export default ensureAuthentication;
