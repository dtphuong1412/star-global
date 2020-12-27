export default class ValidationException extends Error {
  rules: ValidationRule[];

  constructor(message: string, rules: ValidationRule[]) {
    super(message);
    this.rules = rules;
  }
}

export interface ValidationRule {
  message: string;
  field: string;
}
