import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { userService } from './registration.service';
import config from '../../app/config';
import { AppError } from '../../app/errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';

const createUser = catchAsync(async (req, res) => {
  const result = await userService.createUser(req.body);

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});

const createUserLogin = catchAsync(async (req, res) => {
  const result = await userService.createUserLogin(req.body);

  const { token, findUser } = result;

  res.cookie('accessToken', token, {
    secure: config.NODE_ENV === 'development',
    httpOnly: true,
    sameSite: 'none',
    maxAge: 1000 * 60 * 60 * 24 * 5,
  });

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'User logged in successfully',
    token,
    data: findUser,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization;

  if (!token) {
    throw new AppError(StatusCodes.NOT_FOUND, 'token not found');
  }

  let decoded;
  try {
    decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'un-authorized');
  }

  const email = decoded?.email;

  const result = await userService.changePassword(req?.body, email);

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'password changed in successfully',
    data: result,
  });
});
const passwordRecovery = catchAsync(async (req, res) => {
  const result = await userService.passwordRecovery(req?.body?.email);

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'password recovery successfully done',
    data: result,
  });
});
const sendRecoveryPassword = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization;

  if (!token) {
    throw new AppError(StatusCodes.NOT_FOUND, 'token not found');
  }

  let decoded;

  try {
    decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
  } catch (error) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'un-authorized');
  }

  const email = decoded?.email;

  const result = await userService.sendRecoveryPassword(email, req.body);

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'password  successfully recovered',
    data: result,
  });
});

export const userController = {
  createUser,
  createUserLogin,
  changePassword,
  passwordRecovery,
  sendRecoveryPassword,
};
