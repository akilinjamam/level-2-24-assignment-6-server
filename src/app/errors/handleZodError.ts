import { ZodError, ZodIssue } from 'zod';
import { TerrorSource, TgenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TgenericErrorResponse => {
  const errorMessages: TerrorSource = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  const statusCode = 200;

  return {
    statusCode,
    message: 'Zod Validation Erorr',
    errorMessages,
  };
};

export default handleZodError;
