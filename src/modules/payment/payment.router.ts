import express from 'express';
import { paymentController } from './payment.controller';
import jwtAuth from '../../app/middleware/jwtAuth';
import validateRequest from '../../app/middleware/validateSchema';
import { paymentValidation } from './payment.validation';
const router = express.Router();

router.post(
  '/create-payment',
  jwtAuth(),
  validateRequest(paymentValidation.paymentSchema),
  paymentController.makePayment,
);
router.post('/confirm-payment', paymentController.confirmPayment);

export const paymentRouter = router;
