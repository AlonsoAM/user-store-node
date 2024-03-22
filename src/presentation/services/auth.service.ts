import { JwtAdapter, bcryptAdapter, envs } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  LoginuserDto,
  RegisterUserDto,
  UserEntity,
} from "../../domain";
import { EmailService } from "./email.service";

export class AuthService {
  constructor(private readonly emailService: EmailService) {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const existUser = await UserModel.findOne({ email: registerUserDto.email });
    if (existUser) throw CustomError.badRequest("Email already in use");

    try {
      const user = new UserModel(registerUserDto);

      //TODO: encriptar la contraseña
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();

      // enviar email de verificación
      await this.sendEmailVerification(user.email);

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

  private async sendEmailVerification(email: string) {
    const token = await JwtAdapter.generateToken({ email });
    if (!token) throw CustomError.internalServer("Error generating token");

    const verificationLink = `${envs.WEBSERVICE_URL}/auth/validate-email/${token}`;
    const html = `
      <h1>Verify your email</h1>
      <p>Click on the following link to verify your email</p>
      <a href="${verificationLink}">Verify email</a>
    `;

    const emailOptions = {
      to: email,
      subject: "Verify your email",
      htmlBody: html,
    };

    const emailSent = await this.emailService.sendEmail(emailOptions);
    if (!emailSent) throw CustomError.internalServer("Error sending email");

    return true;
  }

  public async validateEmail(token: string) {
    const payload = await JwtAdapter.validatetoken(token);
    if (!payload) throw CustomError.badRequest("Invalid token");

    const { email } = payload as { email: string };
    if (!email) throw CustomError.internalServer("Error validating email");

    const user = await UserModel.findOne({ email });
    if (!user) throw CustomError.internalServer("Invalid email");

    user.emailValidated = true;
    await user.save();

    return true;
  }
}
