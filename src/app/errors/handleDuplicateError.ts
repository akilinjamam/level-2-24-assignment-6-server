import { TerrorSource, TgenericErrorResponse } from '../interface/error';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handleDuplicateError = (err: any): TgenericErrorResponse => {
  const errorMessages: TerrorSource = [
    {
      path: '',

      message: err?.message,
    },
  ];

  const statusCode = 400;
  return {
    statusCode,
    message: err?.message,
    errorMessages,
  };
};

export default handleDuplicateError;
