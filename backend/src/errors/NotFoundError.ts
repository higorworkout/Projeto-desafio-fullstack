import { CustomError } from './CustomErrors';

export class NotFoundError extends CustomError {
  statusCode = 404;

  constructor(public message: string = 'Recurso não encontrado') {
    super(message);
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}