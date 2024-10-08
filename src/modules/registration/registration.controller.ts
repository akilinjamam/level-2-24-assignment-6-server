import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { userService } from './registration.service';
import config from '../../app/config';
import { AppError } from '../../app/errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import User from './registration.model';
import sendErrorRespone from '../../app/utils/sendErrorResponse';
import { TRegistration } from './registration.interface';

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
  const findUser = (await User.findOne({
    email: req?.body?.email,
  })) as TRegistration;

  if (!findUser?.email) {
    sendErrorRespone(res, {
      success: false,
      statusCode: StatusCodes.OK,
      message: 'user not found',
    });
  }

  if (!findUser?.password) {
    sendErrorRespone(res, {
      success: false,
      statusCode: StatusCodes.OK,
      message: 'password not found',
    });
  }

  if (findUser?.password !== req?.body?.password) {
    sendErrorRespone(res, {
      success: false,
      statusCode: StatusCodes.OK,
      message: 'password did not matched',
    });
  }

  const result = await userService.createUserLogin(findUser);

  const { token, findUserInfo } = result;

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
    data: findUserInfo,
  });
});

const changePassword = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization;

  if (!token) {
    throw new AppError(StatusCodes.OK, 'token not found');
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
    message: 'An Email has been sent to you. please check',
    data: result,
  });
});
const sendRecoveryPassword = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization;

  if (!token) {
    return sendErrorRespone(res, {
      statusCode: StatusCodes.OK,
      success: false,
      message: 'token not found',
    });
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
    message: 'password successfully recovered',
    data: result,
  });
});

const updateCoverImg = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization;

  if (!token) {
    return sendErrorRespone(res, {
      statusCode: StatusCodes.OK,
      success: false,
      message: 'token not found',
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
  } catch (error) {
    throw new AppError(StatusCodes.OK, 'un-authorized');
  }
  const email = decoded?.email;

  const result = await userService.updateCoverImg(email, req.file);
  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'cover image successfully changed',
    data: result,
  });
});
const updateProfileImg = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization;

  if (!token) {
    return sendErrorRespone(res, {
      statusCode: StatusCodes.OK,
      success: false,
      message: 'token not found',
    });
  }

  let decoded;

  try {
    decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
  } catch (error) {
    throw new AppError(StatusCodes.OK, 'un-authorized');
  }
  const email = decoded?.email;

  const result = await userService.updateProfileImg(email, req.file);
  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'profile image successfully changed',
    data: result,
  });
});

const getUser = catchAsync(async (req, res) => {
  const token = req?.headers?.authorization;
  if (!token) {
    throw new AppError(StatusCodes.OK, 'token not found');
  }

  let decoded;
  try {
    decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
  } catch (error) {
    throw new AppError(StatusCodes.OK, 'un-authorized');
  }

  const email = decoded?.email;

  const result = await userService.getUser(email);

  sendRespone(res, {
    success: true,
    statusCode: StatusCodes.OK,
    message: 'user found successfully',
    data: result,
  });
});

export const userController = {
  createUser,
  createUserLogin,
  changePassword,
  passwordRecovery,
  sendRecoveryPassword,
  updateCoverImg,
  updateProfileImg,
  getUser,
};
