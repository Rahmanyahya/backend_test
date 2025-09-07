import { NextFunction, Response } from "express";
import { UserRequest } from "../config/web";
import { AuthService } from "./auth.service";

export class AuthController {

    static async login (req: UserRequest, res: Response, next: NextFunction) {
        try {
           const { email, password } = req.body;

           const response = await AuthService.Login({ email, password });

           res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    }

    static async register(req: UserRequest, res: Response, next: NextFunction) {
        try {
           const { email, password, name } = req.body;

           const response = await AuthService.Register({ email, password, name });

           res.status(200).json(response);
        } catch (err) {
            next(err);
        }
    }

}