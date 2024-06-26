import * as jwt from "jsonwebtoken";
import { envs } from "./envs";

const JWT_SEED = envs.JWT_SEED;

export class JwtAdapter {
  static async generateToken(payload: any, duration: string = "2h") {
    return new Promise((resolve) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err) {
          return null;
        } else {
          resolve(token);
        }
      });
    });
  }

  static validatetoken<T>(token: string): Promise<T | null>{
    return new Promise((resolve) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) {
          resolve(null);
        } else {
          resolve(decoded as T);
        }
      });
    });
  }
}
