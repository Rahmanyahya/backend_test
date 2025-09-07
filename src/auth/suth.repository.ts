import { Prisma, user } from "@prisma/client";
import { prisma } from "../config/prisma";

export class AuthRepository {
   
    static async create(data: Prisma.userCreateInput) {
        await prisma.user.create({ data });
    }

    static async getUser(data: Prisma.userWhereUniqueInput): Promise<user | null> {
        return await prisma.user.findUnique({ where: data });
    }

}