/* eslint-disable @typescript-eslint/no-explicit-any */
import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../app/errors/AppError';
import {
  TChangePassword,
  TRecoveryPassword,
  TRegistration,
} from './registration.interface';
import User from './registration.model';
import { createToken } from '../../app/jwtToken/jwtToken';
import config from '../../app/config';
import { sendEmail } from '../../app/utils/sendMail';
import { sendImageToCloudinary } from '../../app/utils/sendImgToCloudinary';

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

const getUser = async (email: string) => {
  console.log(email);
  const findUser = await User.findOne({ email });
  return findUser;
};

const createUserLogin = async (findUserInfo: TRegistration) => {
  const jwtPayload = {
    email: findUserInfo?.email as string,
    role: findUserInfo?.role as string,
  };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expiresIn as string,
  );

  const token = accessToken;

  return {
    token,
    findUserInfo,
  };
};

const changePassword = async (payload: TChangePassword, email: string) => {
  const { newPassword, oldPassword } = payload;

  const findUser = await User.findOne({ email });

  if (!findUser) {
    throw new AppError(StatusCodes.OK, 'user not found');
  }

  if (findUser?.password !== oldPassword) {
    throw new AppError(StatusCodes.OK, 'password did not matched');
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
    throw new AppError(StatusCodes.OK, 'user not found');
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

  const htmlUiLink = `https://level-2-24-assignment-6-clients.vercel.app/recoveryPassword/user?token=${resetToken}`;

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

const updateCoverImg = async (email: string, file: any) => {
  const findEmail = await User.findOne({ email });

  if (!findEmail?.email) {
    throw new AppError(StatusCodes.OK, 'email not found');
  }

  const img = await sendImageToCloudinary(file?.path, file?.filename);

  const coverImg = img?.secure_url;

  const result = await User.updateOne(
    { email: email },
    { $set: { coverImg: coverImg } },
    { new: true },
  );

  return result;
};
const updateProfileImg = async (email: string, file: any) => {
  const findEmail = await User.findOne({ email });

  if (!findEmail?.email) {
    throw new AppError(StatusCodes.OK, 'email not found');
  }

  const img = await sendImageToCloudinary(file?.path, file?.filename);

  const profileImg = img?.secure_url;

  const result = await User.updateOne(
    { email: email },
    { $set: { profileImg: profileImg } },
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
  updateCoverImg,
  updateProfileImg,
  getUser,
};
