import z, { ZodType } from "zod";
 export class BookingSchema {
static readonly createBooking = z.object({ flightId: z.string(), userId: z.string(), amount: z.number().int().positive(), paymentMethod: z.string() }) 
static readonly getBooking = z.object({ uuid: z.string() }) 
static readonly updatePayment = z.object({ uuid: z.string(), status: z.enum(["CONFIRMED", "REJECTED"]) })
 static readonly getBookings = z.object({ flightId: z.string().optional(), search: z.string().optional(), status: z.enum(["CONFIRMED", "REJECTED", "WAITING"]).optional() }) 
static readonly cancelBooking = z.object({ uuid: z.string() }) 
}