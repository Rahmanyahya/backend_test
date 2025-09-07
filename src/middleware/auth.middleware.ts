import { NextFunction, Request, RequestHandler, Response } from "express";
import jwt from "jsonwebtoken";
import { UserRequest } from "../config/web";
import { Role } from "@prisma/client";

export class authMiddleware {

    static async auth(req: UserRequest, res: Response, next: NextFunction) {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        jwt.verify(token, "ini rahasia", (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            req.user = decoded as { uuid: string, role: Role };

            next();
        });
    }

    static authorization (...allowedRoles: Role[]): RequestHandler {
        return (req: UserRequest, res: Response, next: NextFunction) => {
          if (!req.user || !allowedRoles.includes(req.user.role!)) {
            return res.status(403).json({ success: false, data: [], message: 'Not Allowed' });
          } else {
            next();
          }
        };
      };

}