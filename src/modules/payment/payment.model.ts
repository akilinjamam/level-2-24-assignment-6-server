import mongoose, { Schema } from 'mongoose';

import { TPaymentInfo } from './payment.interface';

const paymentSchema = new Schema<TPaymentInfo>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    paid: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  },
);

const Payment = mongoose.model<TPaymentInfo>('Payment', paymentSchema);

export default Payment;
