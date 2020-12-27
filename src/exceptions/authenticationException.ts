export default class AuthenticationException extends Error {
  constructor(message: string) {
    super(message);
  }
}
