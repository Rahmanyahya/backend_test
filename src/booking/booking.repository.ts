import { Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";

export class BookingRepository {

    static async createBooking(payload: Prisma.BookingCreateInput) {
        return await prisma.booking.create({ data: payload });
    }

    static async createPayment(payload: Prisma.PaymentCreateInput) {
        return await prisma.payment.create({ data: payload });
    }

    static async getBookings(payload: Prisma.BookingWhereInput) {
        return await prisma.booking.findMany({ where: payload, include: { flight: true, user: true, payment: true } });
    }

    static async getBooking(payload: Prisma.BookingWhereUniqueInput) {
        return await prisma.booking.findUnique({ where: payload, include: { flight: true, user: true, payment: true } });
    }

    static async getBookingsByUser(payload: Prisma.BookingWhereUniqueInput) {
        return await prisma.booking.findMany({ where: payload, include: { flight: true, user: true, payment: true } });
    }


    static async deleteBooking(payload: Prisma.BookingWhereUniqueInput) {
        return await prisma.booking.delete({ where: payload });
    }

    static async updatePayment(payload: Prisma.PaymentWhereUniqueInput, data: Prisma.PaymentUpdateInput) {
        return await prisma.payment.update({ where: payload, data });
    }

    static async getUserHistory(payload: Prisma.BookingWhereInput) {
        return await prisma.booking.findMany({ where: payload, include: { flight: true, user: true, payment: true } });
    }

}