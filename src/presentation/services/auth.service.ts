import { JwtAdapter, bcryptAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  LoginuserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";

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

      const { password, ...rest } = UserEntity.fromObject(user);

      const token = await JwtAdapter.generateToken({
        id: rest.id,
      });
      if (!token) throw CustomError.internalServer("Error generating token");

      return { user: rest, token };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginuserDto) {
    // Verificar si existe el usuario

    const user = await UserModel.findOne({ email: loginUserDto.email });
    if (!user) throw CustomError.badRequest("Invalid email");

    // isMatch = bcryptAdapter.compare(password, user.password)
    const isMatch = bcryptAdapter.compare(loginUserDto.password, user.password);
    if (!isMatch) throw CustomError.badRequest("Invalid password");

    // retornar
    const { password, ...rest } = UserEntity.fromObject(user);

    const token = await JwtAdapter.generateToken({
      id: user.id,
      email: user.email,
    });
    if (!token) throw CustomError.internalServer("Error generating token");

    return { user: rest, token: token };
  }
}
