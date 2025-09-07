import { ErrorHandler } from "../config/error.handler";
import { Jwt } from "../config/jwt";
import { User, userLogin } from "../types/user.types";
import { AuthSchema } from "./auth.schem";
import { AuthRepository } from "./suth.repository";
import bcrypt from "bcrypt";

export class AuthService {

    static async Login(payload: userLogin) {

        const userRequest = AuthSchema.login.parse(payload);

        const user = await AuthRepository.getUser({ email: userRequest.email });

        if (!user) {
            throw new ErrorHandler("User not found", 404);
        }

        const isValidPassword = await bcrypt.compare(userRequest.password, user.password);

        if (!isValidPassword) {
            throw new ErrorHandler("Invalid password", 401);
        }

        return { token: Jwt.createJWT(user.email, user.role), role: user.role };
    }
    
    static async Register(payload: User) {

        const userRequest = AuthSchema.register.parse(payload);

        const user = await AuthRepository.getUser({ email: userRequest.email }) as User;

        if (user) {
            throw new ErrorHandler("User already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(userRequest.password, 10);

        await AuthRepository.create({ email: userRequest.email, password: hashedPassword, name: userRequest.name });

        return { token: Jwt.createJWT(userRequest.email, "USER"), role: "USER" };
    }

}