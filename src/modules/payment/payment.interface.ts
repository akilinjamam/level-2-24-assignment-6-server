import { Types } from 'mongoose';

export type TPaymentInfo = {
  userId: Types.ObjectId;
  paid: boolean;
};
