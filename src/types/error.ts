import { ValidationRule } from "../exceptions/validationException";

export class DbErrorResponseDTO {
  message: string;
  errorCode: number;

  constructor(message: string, errorCode: number) {
    this.message = message;
    this.errorCode = errorCode;
  }
}

export enum ErrorCode {
  DB_TIMEOUT_ERROR = 1,
  DB_UNKNOWN_ERROR = 2,
  VALIDATION_ERROR = 3,
  AUTHENTICATION_ERROR = 4,
}

export class ValidationErrorResponseDTO {
  message: string;
  rules: ValidationRule[];
  errorCode: number;

  constructor(message: string, rules: ValidationRule[]) {
    this.message = message;
    this.rules = rules;
    this.errorCode = ErrorCode.VALIDATION_ERROR;
  }
}

export class AuthenticationErrorResponseDTO {
  message: string;
  errorCode: number;

  constructor(message: string) {
    this.message = message;
    this.errorCode = ErrorCode.AUTHENTICATION_ERROR;
  }
}
