import { regularExps } from "../../../config";

export class LoginuserDto {
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string?, LoginuserDto?] {
    const { email, password } = object;

    if (!email) return ["Missing email"];
    if (regularExps.email.test(email) === false) return ["Invalid email"];
    if (!password) return ["Missing password"];
    if (password.length < 8) return ["Password must be at least 8 characters"];

    return [undefined, new LoginuserDto(email, password)];
  }
}
