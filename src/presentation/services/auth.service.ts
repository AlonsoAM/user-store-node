import { bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import { CustomError, RegisterUserDto, UserEntity } from "../../domain";

export class AuthService {
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("Email already in use");

    try {
      const user = new UserModel(registerUserDto);

      //TODO: encriptar la contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();
      //TODO: JWT para mantener la autenticacion del usuario

      //TODO: enviar email de validacion

      const { password, ...rest } = UserEntity.fromObject(user);

      return { user: rest, token: "JWT" };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }
}
