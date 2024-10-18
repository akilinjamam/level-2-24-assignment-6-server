import { Types } from 'mongoose';

export type TPaymentRequest = {
  store_id?: string;
  tran_id?: string;
  success_url?: string;
  fail_url?: string;
  cancel_url?: string;
  amount?: string;
  currency?: string;
  signature_key?: string;
  desc?: string;
  cus_name?: string;
  cus_email?: string;
  cus_add1?: string;
  cus_add2?: string;
  cus_city?: string;
  cus_state?: string;
  cus_postcode?: string;
  cus_country?: string;
  cus_phone?: string;
  type?: string;
  userId?: Types.ObjectId;
};
