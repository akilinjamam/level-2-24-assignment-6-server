/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';

type TErrorResponse = {
  statusCode: number;
  success: boolean;
  message?: string;
};

const sendErrorRespone = (res: Response, data: TErrorResponse) => {
  res.status(data.statusCode).json({
    success: data.success,
    statusCode: data.statusCode,
    message: data.message,
  });
};

export default sendErrorRespone;
