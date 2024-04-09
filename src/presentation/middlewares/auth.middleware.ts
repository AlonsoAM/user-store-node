import {NextFunction, Request, Response} from "express";
import {JwtAdapter} from "../../config";
import {UserModel} from "../../data";
import {UserEntity} from "../../domain";

export class AuthMiddleware {
    static async validateJWT(req: Request, res: Response, next: NextFunction) {

        const authorization = req.headers.authorization;

        if (!authorization) return res.status(401).json({error: "Token not found"});

        if (!authorization.startsWith("Bearer ")) return res.status(401).json({error: "Inavlid Bearer Token"});

        const token = authorization.split(" ").at(1) || "";

        try {

            const payload = await JwtAdapter.validatetoken<{ id: string }>(token);
            if (!payload) return res.status(401).json({error: "Invalid Token"});

            const user = await UserModel.findById(payload.id);
            if (!user) return res.status(401).json({error: "User not found"});

            req.body.user = UserEntity.fromObject(user);

            next();

        } catch (error) {
            console.log(error);
            return res.status(500).json({error: "Internal Server Error"});
        }

    }
}