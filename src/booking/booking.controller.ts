import { NextFunction, Response } from "express";
import { UserRequest } from "../config/web";
import { BookingService } from "./booking.service";
import { PaymentStatus } from "@prisma/client";

export class BookingController {

    static async createBooking(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { flightId, amount, paymentMethod } = req.body;
            const userId = req.user?.uuid;


            if (!userId) throw new Error("User not found");

            console.log(flightId, userId, amount, paymentMethod);
            await BookingService.createBooking({
                flightId,
                userId,
                amount: Number(amount),
                paymentMethod
            });

            res.status(201).json({ message: "Success" });
        } catch (e) {
            next(e);
        }
    }

    static async getBookings(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { flightId, search, status } = req.query as { flightId: string, search: string, status: PaymentStatus };

            const bookings = await BookingService.getBookings({ flightId, search, status });

            res.status(200).json(bookings);
        } catch (e) {
            next(e);
        }
    }

    static async getBooking(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { uuid } = req.query as { uuid: string };

            const booking = await BookingService.getBooking(uuid);

            res.status(200).json(booking);
        } catch (e) {
            next(e);
        }
    }

    static async cancelBooking(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { uuid } = req.query as { uuid: string };

            await BookingService.cancelBooking(uuid, req.user!.uuid);

            res.status(200).json({ message: "Success" });
        } catch (e) {
            next(e);
        }
    }

    static async updatePayment(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { uuid, status } = req.body as { uuid: string, status: PaymentStatus  };

            await BookingService.updatePayment({ uuid, status });

            res.status(200).json({ message: "Success" });
        } catch (e) {
            next(e);
        }
    }

    static async getHistory(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { uuid } = req.query as { uuid: string };

            const history = await BookingService.getUserHistory(uuid);

            res.status(200).json(history);
        } catch (e) {
            next(e);
        }
    }

}