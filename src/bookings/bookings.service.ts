import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { BookingStatus, PaymentType, PaymentStatus } from '@prisma/client';

@Injectable()
export class BookingsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { search?: string; status?: BookingStatus }) {
    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.search) {
      where.OR = [
        { bookingNumber: { contains: query.search, mode: 'insensitive' } },
        { residentName: { contains: query.search, mode: 'insensitive' } },
        { residentEmail: { contains: query.search, mode: 'insensitive' } },
        { residentPhone: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.booking.findMany({
      where,
      include: {
        room: true,
        payments: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const booking = await this.prisma.booking.findUnique({
      where: { id },
      include: { room: true, payments: true },
    });
    if (!booking) throw new NotFoundException(`Booking with ID ${id} not found`);
    return booking;
  }

  async create(data: {
    residentName: string;
    residentEmail: string;
    residentPhone: string;
    roomId: string;
    checkInDate: string;
    tenureMonths: number;
    paymentMethod?: string;
  }) {
    const room = await this.prisma.room.findUnique({
      where: { id: data.roomId },
    });

    if (!room) throw new NotFoundException('Selected room was not found');
    if (room.occupiedBeds >= room.capacity) {
      throw new BadRequestException(`Room ${room.roomNumber} has no vacant beds available.`);
    }

    const tenure = Math.max(1, Number(data.tenureMonths || 1));
    const totalAmount = room.priceMonthly * tenure + room.securityDeposit;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `HST-2026-${randomSuffix}`;

    // Create booking and update room occupied beds
    const result = await this.prisma.$transaction(async (tx) => {
      const newBooking = await tx.booking.create({
        data: {
          bookingNumber,
          residentName: data.residentName,
          residentEmail: data.residentEmail,
          residentPhone: data.residentPhone,
          roomId: room.id,
          checkInDate: new Date(data.checkInDate || new Date()),
          tenureMonths: tenure,
          monthlyRent: room.priceMonthly,
          securityDeposit: room.securityDeposit,
          totalAmount,
          status: BookingStatus.CONFIRMED,
        },
      });

      // Update room occupied beds
      const newOccupied = room.occupiedBeds + 1;
      await tx.room.update({
        where: { id: room.id },
        data: {
          occupiedBeds: newOccupied,
          status: newOccupied >= room.capacity ? 'FULL' : 'AVAILABLE',
        },
      });

      // Create an automatic payment receipt if payment method provided
      const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
      const transactionId = `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;

      const payment = await tx.payment.create({
        data: {
          transactionId,
          invoiceNumber,
          bookingId: newBooking.id,
          payerName: data.residentName,
          payerEmail: data.residentEmail,
          amount: totalAmount,
          paymentType: PaymentType.ROOM_RENT,
          paymentMethod: data.paymentMethod || 'Online (UPI/Card)',
          status: PaymentStatus.SUCCESS,
        },
      });

      return {
        ...newBooking,
        room,
        payment,
      };
    });

    return result;
  }

  async cancel(id: string) {
    const booking = await this.findOne(id);
    if (booking.status === BookingStatus.CANCELLED) {
      throw new BadRequestException('Booking is already cancelled');
    }

    return this.prisma.$transaction(async (tx) => {
      const updated = await tx.booking.update({
        where: { id },
        data: { status: BookingStatus.CANCELLED },
      });

      // Free bed in room
      const room = await tx.room.findUnique({ where: { id: booking.roomId } });
      if (room && room.occupiedBeds > 0) {
        const newOccupied = Math.max(0, room.occupiedBeds - 1);
        await tx.room.update({
          where: { id: room.id },
          data: {
            occupiedBeds: newOccupied,
            status: 'AVAILABLE',
          },
        });
      }

      return updated;
    });
  }
}
