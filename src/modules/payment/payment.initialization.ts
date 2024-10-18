import axios from 'axios';
import config from '../../app/config';
import { TPaymentRequest } from './payment.constant';

export const paymentInitialization = async (data: TPaymentRequest) => {
  try {
    const url = config.payment_api_key as string;
    const result = await axios.post(url, {
      store_id: config.store_id,
      tran_id: data.tran_id,
      success_url: `https://level-2-24-assignment-6-server.vercel.app/api/payment/confirm-payment?userId=${data?.userId}`,
      fail_url: `https://level-2-24-assignment-6-server.vercel.app/api/payment/failed-payment?userId=${data?.userId}`,
      cancel_url: `https://level-2-24-assignment-6-server.vercel.app/api/payment/failed-payment?userId=${data?.userId}`,
      amount: '10.0',
      currency: 'BDT',
      signature_key: config.signature_key,
      desc: 'Merchant Registration Payment',
      cus_name: data.cus_name,
      cus_email: data.cus_email,
      cus_add1: data.cus_add1,
      cus_add2: 'Mohakhali DOHS',
      cus_city: data.cus_city,
      cus_state: data.cus_state,
      cus_postcode: '1206',
      cus_country: data.cus_country,
      cus_phone: data.cus_phone,
      type: 'json',
    });

    return result;
  } catch (error) {
    console.log(error);
  }
};
