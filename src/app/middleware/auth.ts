import { NextFunction, Request, Response } from 'express';

import catchAsync from '../utils/catchAsync';
import { StatusCodes } from 'http-status-codes';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
// import { TUserRole } from '../../modules/user/user.interface';
import sendRespone from '../utils/sendRespone';
import { TUserRole } from './auth.type';

const auth = (...requiredRoles: TUserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;

    const mainToken = token?.split(' ')[1];

    if (!mainToken) {
      return sendRespone(res, {
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }

    const decoded = jwt.verify(
      mainToken,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role } = decoded;

    if (requiredRoles && !requiredRoles.includes(role)) {
      return sendRespone(res, {
        success: false,
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'You have no access to this route',
      });
    }
    next();
  });
};

export default auth;
