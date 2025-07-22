import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken';
import { NotAuthorizedError } from 'error-utils';

interface ITokenPayload {
  email: string;
  id: string;
}

export interface AuthenticatedRequest extends Request {
  user: ITokenPayload;
}

export default async function isAuthenticated(
  request: AuthenticatedRequest,
  response: Response,
  next: NextFunction
): Promise<Response | void> {

  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new NotAuthorizedError();
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, process.env.JWT_SECRET!) as ITokenPayload;

    request.user = {
      id: decoded.id,
      email: decoded.email,
    };

    next();
  } catch (error) {
    return response.status(401).json({ message: 'Token inválido ou expirado' });
  }
}