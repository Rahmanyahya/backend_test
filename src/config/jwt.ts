import { Role } from "@prisma/client";
import jwt from 'jsonwebtoken'
export class Jwt {

    static createJWT(uuid: string, role: Role) {
        return jwt.sign({ uuid, role }, 'ini rahasia', { expiresIn: '1d' })
    }


}