import { FlightStatus } from "@prisma/client";

export type CreateFlight = {
    flightNumber: string;
    airline: string;
    origin: string;
    destination: string;
    departureTime: Date;
    arrivalTime: Date;
    duration: number;
    aircraftType: string;
    totalSeats: number;
    availableSeats: number;
    price: number;
    status: FlightStatus;
  };
  
  
  export type UpdateFlight = Partial<CreateFlight> & {
    uuid: string
  };

  export type GetFlight = {
    origin?: string;
    destination?: string;
  };
  