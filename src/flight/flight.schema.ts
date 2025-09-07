import z from "zod";

export class FlightSchema {

    static readonly CREATE = z.object({
        flightNumber: z.string().min(1).max(20),
        airline: z.string().min(1).max(100),
        origin: z.string().min(1).max(100),
        destination: z.string().min(1).max(100),
        departureTime: z.coerce.date(), 
        arrivalTime: z.coerce.date(),
        duration: z.number().int().positive(),
        aircraftType: z.string().min(1).max(100),
        totalSeats: z.number().int().positive(),
        availableSeats: z.number().int().nonnegative(),
        price: z.number().int().nonnegative(),
        status: z.enum(["scheduled", "boarding", "departed", "arrived", "cancelled", "delayed"])
    })

    static readonly UPDATE = this.CREATE.partial().extend({
        uuid: z.string()
    })

    static readonly GET_BY_ID = z.object({ uuid: z.string() })

    static readonly GET_FLIGHT = z.object({ origin: z.string().optional(), destination: z.string().optional() })

    static readonly DELETE_FLIGHT = z.object({ uuid: z.string() })
}