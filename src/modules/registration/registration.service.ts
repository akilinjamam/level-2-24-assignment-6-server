import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../app/errors/AppError';
import { TLogin, TRegistration } from './registration.interface';
import User from './registration.model';
import { createToken } from '../../app/jwtToken/jwtToken';
import config from '../../app/config';

const createUser = async (payload: TRegistration) => {
  const { email } = payload;

  const findEmail = await User.findOne({ email });

  if (findEmail) {
    throw new AppError(
      StatusCodes.FORBIDDEN,
      'this email is already registered',
    );
  }

  const result = await User.create(payload);
  return result;
};

const createUserLogin = async (payload: TLogin) => {
  const findUser = await User.findOne({ email: payload?.email });

  if (!findUser) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'user not found');
  }
  if (findUser?.password !== payload?.password) {
    throw new AppError(StatusCodes.UNAUTHORIZED, 'password did not match ');
  }

  let token;

  if (findUser) {
    const jwtPayload = {
      email: findUser?.email as string,
      role: findUser?.role as string,
    };
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expiresIn as string,
    );

    token = accessToken;
  } else {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found ');
  }

  return {
    token,
    findUser,
  };
};

export const userService = {
  createUser,
  createUserLogin,
};
