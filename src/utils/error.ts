export class SolaceApiError extends Error {
  error: string;

  message: string;

  errorCode: string;

  status: number;

  invalidField?: string;

  constructor(data: {
    error?: string;
    errorCode: string;
    status: number;
    message?: string;
    invalidField?: string;
  }) {
    const message = data.error || (data.message as string);
    super(message);

    this.name = this.constructor.name;
    this.error = message;
    this.message = message;
    this.errorCode = data.errorCode;
    this.status = data.status;
    this.invalidField = data?.invalidField;

    Error.captureStackTrace(this, this.constructor);
  }
}
