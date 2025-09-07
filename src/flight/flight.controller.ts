import { NextFunction, Response } from "express";
import { UserRequest } from "../config/web";
import { FlightService } from "./flight.service";

export class FlightController {

    static async createFlight(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { flightNumber, airline, origin, destination, departureTime, arrivalTime, duration, aircraftType, totalSeats, availableSeats, price, status } = req.body;

            const payload = { flightNumber, airline, origin, destination, departureTime, arrivalTime, duration, aircraftType, totalSeats, availableSeats, price, status };

            await FlightService.createFlight(payload);

            res.status(201).json({ message: "Flight created successfully" });
        } catch (e) {
            next(e)
        }
    }

    static async updateFlight(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { uuid ,flightNumber, airline, origin, destination, departureTime, arrivalTime, duration, aircraftType, totalSeats, availableSeats, price, status } = req.body;

            const payload = { uuid, flightNumber, airline, origin, destination, departureTime, arrivalTime, duration, aircraftType, totalSeats, availableSeats, price, status };

            await FlightService.updateFlight(payload);

            res.status(201).json({ message: "Flight updated successfully" });
        } catch (e) {
            next(e)
        }
    }

    static async getFlightById(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { uuid } = req.query as { uuid: string };

            const flight = await FlightService.getFlightById(uuid);

            res.status(200).json(flight);
        } catch (e) {
            next(e)
        }
    }

    static async getFlights(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const { origin, destination } = req.query as { origin: string, destination: string };

            const flights = await FlightService.getFlights({ origin, destination });

            res.status(200).json(flights);
        } catch (e) {
            next(e)
        }
    }

}