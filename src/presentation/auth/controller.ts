import { Request, Response } from "express";
import { CustomError, RegisterUserDto } from "../../domain";
import { AuthService } from "../services/auth.service";
import { error } from "console";

export class AuthController {
  //* DI
  constructor(public readonly autService: AuthService) {}

  private handledError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(`${error}`);
    return res.status(500).json({ error: "Internal Server Error" });
  };

  registerUser = (req: Request, res: Response) => {
    const [error, registerUserDto] = RegisterUserDto.create(req.body);
    if (error) return res.status(400).json({ error });

    this.autService
      .registerUser(registerUserDto!)
      .then((data) => res.json(data))
      .catch((error) => this.handledError(error, res));
  };
  loginUser = (req: Request, res: Response) => {
    res.json("Login User");
  };
  validateEmail = (req: Request, res: Response) => {
    res.json("Validate Email");
  };
}
