import { JwtPayload } from 'jsonwebtoken';
import sendRespone from '../utils/sendRespone';
import jwt from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import config from '../config';
import User from '../../modules/registration/registration.model';
const jwtAuth = () => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const token = req?.headers?.authorization;

    if (!token) {
      return sendRespone(res, {
        success: false,
        statusCode: StatusCodes.OK,
        message: 'TOKEN not found',
      });
    }

    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { email } = decoded;

    const findUser = await User.findOne({ email: email });

    if (!findUser?.email) {
      return sendRespone(res, {
        success: false,
        statusCode: StatusCodes.OK,
        message: 'user not found',
      });
    }
    next();
  });
};

export default jwtAuth;
