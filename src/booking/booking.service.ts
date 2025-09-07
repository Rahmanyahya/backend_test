import { ErrorHandler } from "../config/error.handler";
import { FlightRepository } from "../flight/flight.repository";
import { CreateBooking, GetBookings, UpdatePayment } from "../types/boking.types";
import { BookingRepository } from "./booking.repository";
import { BookingSchema } from "./booking.schema";


export class BookingService {

    static async createBooking(payload: CreateBooking) {
        const userRequest = BookingSchema.createBooking.parse(payload);


        const isFlightExist = await FlightRepository.findOne({ uuid: userRequest.flightId });

        if (!isFlightExist) throw new ErrorHandler("Flight not found", 404);

        if (userRequest.amount !== isFlightExist.price) throw new ErrorHandler("Amount is not equal to flight price", 400);

        const booking = await BookingRepository.createBooking({ flight: { connect: { uuid: userRequest.flightId } }, user: { connect: { uuid: userRequest.userId } }});

        await BookingRepository.createPayment({ booking: { connect: { uuid: booking.uuid } }, amount: userRequest.amount, paymentMethod: userRequest.paymentMethod });

        await FlightRepository.update({ uuid: isFlightExist.uuid }, { availableSeats: isFlightExist.availableSeats - 1 });
    }

    static async getBookings(payload: GetBookings) {
        const userRequest = BookingSchema.getBookings.parse(payload);
        const data = await BookingRepository.getBookings({ flightId: userRequest.flightId, user: { name: { contains: userRequest.search }}, payment: { paymentStatus: userRequest.status }});

        return data.map(item => (
            {
                uuid: item.uuid,
                name: item.user.name,
                code: item.bookingCode,
                status: item.payment?.paymentStatus,
            }
        ))
    }

    static async getBooking(uuid: string) {
        const userRequest = BookingSchema.getBooking.parse({ uuid });
       
        const data = await BookingRepository.getBooking({ uuid: userRequest.uuid });

        if (!data) throw new ErrorHandler("Booking not found", 404);

        return {
            uuid: data.uuid,
            name: data.user.name,
            code: data.bookingCode,
            flight: data.flight.flightNumber,
            status: data.payment?.paymentStatus
        }
    }

    static async cancelBooking(uuid: string, userId: string) {
        const userRequest = BookingSchema.cancelBooking.parse({ uuid });

        const isBookingExist = await BookingRepository.getBooking({ uuid: userRequest.uuid, userId });

        if (!isBookingExist) throw new ErrorHandler("Booking not found", 404);

        if (isBookingExist.payment?.paymentStatus === 'REJECTED') {
            throw new ErrorHandler("Payment has been rejected", 400);
        }

        await BookingRepository.deleteBooking({ uuid: userRequest.uuid });

        if (isBookingExist.payment?.paymentStatus === 'CONFIRMED') await FlightRepository.update({ uuid: isBookingExist.flight.uuid }, { availableSeats: isBookingExist.flight.availableSeats + 1 });
    }

    static async updatePayment(payload: UpdatePayment) {
        const userRequest = BookingSchema.updatePayment.parse(payload);

        const isPaymenExist = await BookingRepository.getBooking({ uuid: userRequest.uuid });

        if (!isPaymenExist) throw new ErrorHandler("Payment not found", 404);

        await BookingRepository.updatePayment({ bookingId: userRequest.uuid}, { paymentStatus: userRequest.status})

        if (userRequest.status === 'CONFIRMED') await FlightRepository.update({ uuid: isPaymenExist.flight.uuid }, { availableSeats: isPaymenExist.flight.availableSeats - 1 });
    }

    static async getUserHistory(uuid: string) {
    const data = await BookingRepository.getUserHistory({ userId: uuid });

    return data.map(item => (
        {
            uuid: item.uuid,
            name: item.user.name,
            code: item.bookingCode,
            flight: item.flight.flightNumber,
            paymentStatus: item.payment?.paymentStatus
        }
    ))
    }

}