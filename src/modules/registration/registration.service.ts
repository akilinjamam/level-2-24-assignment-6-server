import { StatusCodes } from 'http-status-codes';
import { AppError } from '../../app/errors/AppError';
import { TRegistration } from './registration.interface';
import User from './registration.model';

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

export const userService = {
  createUser,
};
