// Booking request types

import { PaymentStatus } from "@prisma/client";

export type CreateBooking = {
    flightId: string;
    userId: string;
    amount: number; // harus integer & positif (divalidasi di zod, tapi type cukup number)
    paymentMethod: string;
  };
  
  export type GetBooking = {
    uuid: string;
  };
  
  export type UpdatePayment = {
    uuid: string;
    status: PaymentStatus;
  };
  
  export type GetBookings = {
    flightId: string;
    search?: string;
    status?: PaymentStatus;
  };
  
  export type CancelBooking = {
    uuid: string;
  };
  