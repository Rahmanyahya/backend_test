import { Flight, Prisma } from "@prisma/client";
import { prisma } from "../config/prisma";
import { GetFlight } from "../types/flight.types";

export class FlightRepository {

  static async create(data: Prisma.FlightCreateInput) {
    return prisma.flight.create({
      data,
    });
  }


  static async findOne(where: Prisma.FlightWhereUniqueInput) {
    return prisma.flight.findUnique({
      where,
    });
  }

  static async findFirst(where: Prisma.FlightWhereInput) {
    return prisma.flight.findFirst({
      where,
    });
  }
  static async findMany(where: GetFlight) {
    return prisma.flight.findMany({
      where: {
        ...(where.destination &&  { destination: where.destination }),
        ...(where.origin &&  { origin: where.origin }),
        departureTime: { gte: new Date() }
      },
      orderBy: {
        price: "asc"
      }
    });
  }

  static async update(where: Prisma.FlightWhereUniqueInput, data: Prisma.FlightUpdateInput) {
    return prisma.flight.update({
      where,
      data,
    });
  }

  static async delete(where: Prisma.FlightWhereUniqueInput) {
    return prisma.flight.delete({
      where,
    });
  }
}