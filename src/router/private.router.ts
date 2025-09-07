import { Router } from "express";
import { FlightController } from "../flight/flight.controller";
import { authMiddleware } from "../middleware/auth.middleware";
import { BookingController } from "../booking/booking.controller";

export const privateRouter = Router();

privateRouter.use(authMiddleware.auth)

privateRouter.post("/flight", authMiddleware.authorization("ADMIN") ,FlightController.createFlight)
privateRouter.put("/flight", authMiddleware.authorization("ADMIN") ,FlightController.updateFlight)
privateRouter.get("/flight", FlightController.getFlights)
privateRouter.get("/flight-detail", FlightController.getFlightById)

privateRouter.get("/bookings", authMiddleware.authorization("ADMIN") ,BookingController.getBookings)
privateRouter.get("/booking-detail",  authMiddleware.authorization("ADMIN"),BookingController.getBooking)
privateRouter.delete("/cancel-booking", authMiddleware.authorization("USER") ,BookingController.cancelBooking)
privateRouter.put("/update-payment", authMiddleware.authorization("ADMIN") ,BookingController.updatePayment)
privateRouter.get("/history", authMiddleware.authorization("USER") ,BookingController.getHistory)
privateRouter.post("/booking", authMiddleware.authorization("USER") ,BookingController.createBooking)