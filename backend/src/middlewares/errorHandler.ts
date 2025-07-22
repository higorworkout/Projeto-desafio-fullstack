import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomErrors';
import { isCelebrateError } from 'celebrate';


export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error('Erro capturado:', err);

  if (err instanceof CustomError) {
    console.log(err)
    return res.status(err.statusCode).send({ errors: err.serializeErrors() });
  }

  if (isCelebrateError(err)) {
      const bodyError = err.details.get('body');
      const queryError = err.details.get('query');
      const paramsError = err.details.get('params');
      const validationError = bodyError || queryError || paramsError;

      return res.status(400).json({
        status: 'validation_error',
        message: 'Erro de validação',
        errors: validationError?.details.map((detail) => ({
          message: detail.message,
          path: detail.path.join('.'),
          type: detail.type,
        })),
        });
    }

  // Erro não tratado
  return res.status(500).send({
    errors: [{ message: 'Erro interno do servidor' }],
  });
};