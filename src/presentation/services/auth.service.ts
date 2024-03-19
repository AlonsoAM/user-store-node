import { UserModel } from "../../data";
import { CustomError, RegisterUserDto } from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("Email already in use");

    try {
      const user = new UserModel(registerUserDto);
      await user.save();

      //TODO: encriptar la contraseña

      //TODO: JWT para mantener la autenticacion del usuario

      //TODO: enviar email de validacion

      return user;
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
