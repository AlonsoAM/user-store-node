import { regularExps } from "../../../config";

export class RegisterUserDto {
  private constructor(
    public name: string,
    public email: string,
    public password: string
  ) {}

  static create(object: { [key: string]: any }): [string?, RegisterUserDto?] {
    const { name, email, password } = object;

    if (!name) return ["Missing name", undefined];
    if (!email) return ["Missing email", undefined];
    if (regularExps.email.test(email) === false)
      return ["Invalid email", undefined];
    if (!password) return ["Missing password", undefined];
    if (password.length < 8)
      return ["Password must be at least 8 characters", undefined];

    return [undefined, new RegisterUserDto(name, email, password)];
  }
}
