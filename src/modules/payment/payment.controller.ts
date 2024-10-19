import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../app/utils/catchAsync';
import sendRespone from '../../app/utils/sendRespone';
import { paymentInitialization } from './payment.initialization';
import { v4 as uuidv4 } from 'uuid';
import { TPaymentRequest } from './payment.constant';
import { failedPaymentHtml, paymentHtml } from './payment.html';
import Payment from './payment.model';
import { TPaymentInfo } from './payment.interface';
import User from '../registration/registration.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../app/config';
const makePayment = catchAsync(async (req, res) => {
  const payload: TPaymentInfo = req.body;
  const result = await Payment.create(payload);

  const uniqueId = uuidv4();

  const token = req?.headers?.authorization;

  const decoded = jwt.verify(
    token as string,
    config.jwt_access_secret as string,
  ) as JwtPayload;

  const { email, name } = decoded;

  const data: TPaymentRequest = {
    tran_id: uniqueId,
    cus_name: name,
    cus_email: email,
    cus_add1: 'chittagong',
    cus_city: 'chittagong',
    cus_state: 'chittagong',
    cus_country: 'Bangladesh',
    cus_phone: '123456789',
    userId: payload.userId,
    amount: '100',
  };

  const returnValue = await paymentInitialization(data);

  const finalData = {
    result,
    url: returnValue?.data?.payment_url,
  };

  sendRespone(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: 'payment requested',
    data: finalData,
  });
});

const confirmPayment = catchAsync(async (req, res) => {
  const userId = req.query.userId;
  const findPaymentId = await Payment.findOne({ userId: userId });

  if (findPaymentId?._id) {
    await Payment.updateOne(
      { _id: findPaymentId?._id },
      { $set: { paid: true } },
      { runValidators: true },
    );

    await User.updateOne(
      { _id: findPaymentId?.userId },
      { $set: { verified: true } },
      { runValidators: true },
    );
  }

  res.send(paymentHtml);
});

const failedPayment = catchAsync(async (req, res) => {
  const userId = req.query.userId;
  const findPaymentId = await Payment.findOne({ userId: userId });

  if (findPaymentId?._id) {
    await Payment.deleteOne({ _id: findPaymentId?._id });
    await User.updateOne(
      { _id: findPaymentId?.userId },
      { $set: { verified: false } },
      { runValidators: true },
    );
  }

  res.send(failedPaymentHtml);
});

export const paymentController = {
  makePayment,
  confirmPayment,
  failedPayment,
};
