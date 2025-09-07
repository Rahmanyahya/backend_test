import { ErrorHandler } from "../config/error.handler";
import { prisma } from "../config/prisma";
import { CreateFlight, GetFlight, UpdateFlight } from "../types/flight.types";
import { FlightRepository } from "./flight.repository";
import { FlightSchema } from "./flight.schema";

export class FlightService {

    static async createFlight(payload: CreateFlight) {

        const userRequest = FlightSchema.CREATE.parse(payload);

        const data = await FlightRepository.findFirst({ flightNumber: userRequest.flightNumber });

        if (data) throw new ErrorHandler("Flight already exists", 409);

        if(userRequest.availableSeats < userRequest.totalSeats) throw new ErrorHandler("Available seats cannot be less than total seats", 400);
        

        await FlightRepository.create(userRequest);
    }

    static async updateFlight(payload: UpdateFlight) {
        const userRequest = FlightSchema.UPDATE.parse(payload);

        const data = await FlightRepository.findOne({ uuid: userRequest.uuid });

        if (!data) throw new ErrorHandler("Flight not found", 404);

        await FlightRepository.update({ uuid: userRequest.uuid }, userRequest);
    }

    static async getFlightById(uuid: string) {
        const userRequest = FlightSchema.GET_BY_ID.parse({ uuid });

        const data = await FlightRepository.findOne({ uuid: userRequest.uuid });

        if (!data) throw new ErrorHandler("Flight not found", 404);

        return data;
    }

    static async getFlights(payload: GetFlight) {
        const userRequest = FlightSchema.GET_FLIGHT.parse(payload);
        return await FlightRepository.findMany(userRequest);
    }

}