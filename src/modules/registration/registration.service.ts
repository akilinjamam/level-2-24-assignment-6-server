import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../app/errors/AppError';
import {
  TChangePassword,
  TLogin,
  TRecoveryPassword,
  TRegistration,
} from './registration.interface';
import User from './registration.model';
import { createToken } from '../../app/jwtToken/jwtToken';
import config from '../../app/config';
import { sendEmail } from '../../app/utils/sendMail';
// all updated....
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

const changePassword = async (payload: TChangePassword, email: string) => {
  const { newPassword, oldPassword } = payload;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
  }

  if (findUser?.password !== oldPassword) {
    throw new AppError(StatusCodes.NOT_FOUND, 'password did not matched');
  }

  const result = await User.updateOne(
    { email },
    { $set: { password: newPassword } },
    { new: true },
  );

  return result;
};

const passwordRecovery = async (payload: TRecoveryPassword) => {
  const findUser = await User.findOne({ email: payload });

  if (!findUser?.email) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
  }

  const jwtPayload = {
    email: findUser?.email,
    role: findUser?.role as string,
  };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m',
  );

  const htmlUiLink = `https://level-2-24-assignment-6-clients.vercel.app/recoveryPassword?token=${resetToken}`;

  sendEmail(findUser?.email, htmlUiLink);
};

const sendRecoveryPassword = async (
  email: TRecoveryPassword,
  payload: Record<string, unknown>,
) => {
  const { password } = payload;

  const findUser = await User.findOne({ email: email });

  if (!findUser?.email) {
    throw new AppError(StatusCodes.NOT_FOUND, 'user not found');
  }

  const result = await User.updateOne(
    { email },
    { $set: { password: password } },
    { new: true },
  );

  return result;
};

export const userService = {
  createUser,
  createUserLogin,
  changePassword,
  passwordRecovery,
  sendRecoveryPassword,
};
