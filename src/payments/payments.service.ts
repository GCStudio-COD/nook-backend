import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PaymentType, PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: { search?: string; paymentType?: PaymentType }) {
    const where: any = {};
    if (query?.paymentType) where.paymentType = query.paymentType;
    if (query?.search) {
      where.OR = [
        { transactionId: { contains: query.search, mode: 'insensitive' } },
        { invoiceNumber: { contains: query.search, mode: 'insensitive' } },
        { payerName: { contains: query.search, mode: 'insensitive' } },
        { payerEmail: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.payment.findMany({
      where,
      include: {
        booking: {
          include: { room: true },
        },
      },
      orderBy: { paidAt: 'desc' },
    });
  }

  async getStats() {
    const payments = await this.prisma.payment.findMany({
      where: { status: PaymentStatus.SUCCESS },
    });

    const totalCollected = payments.reduce((acc, p) => acc + p.amount, 0);
    const count = payments.length;

    const byType = {
      ROOM_RENT: payments.filter((p) => p.paymentType === PaymentType.ROOM_RENT).reduce((acc, p) => acc + p.amount, 0),
      ADMISSION_FEE: payments.filter((p) => p.paymentType === PaymentType.ADMISSION_FEE).reduce((acc, p) => acc + p.amount, 0),
      SECURITY_DEPOSIT: payments.filter((p) => p.paymentType === PaymentType.SECURITY_DEPOSIT).reduce((acc, p) => acc + p.amount, 0),
      SERVICE_CHARGE: payments.filter((p) => p.paymentType === PaymentType.SERVICE_CHARGE).reduce((acc, p) => acc + p.amount, 0),
      MESS_FEE: payments.filter((p) => p.paymentType === PaymentType.MESS_FEE).reduce((acc, p) => acc + p.amount, 0),
    };

    return {
      totalCollected,
      totalTransactions: count,
      byType,
    };
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findFirst({
      where: {
        OR: [{ id }, { transactionId: id }, { invoiceNumber: id }],
      },
      include: {
        booking: {
          include: { room: true },
        },
      },
    });

    if (!payment) throw new NotFoundException(`Payment record not found`);
    return payment;
  }

  async create(data: {
    payerName: string;
    payerEmail: string;
    amount: number;
    paymentType: PaymentType;
    paymentMethod: string;
    bookingId?: string;
  }) {
    const invoiceNumber = `INV-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
    const transactionId = `TXN-HST-${Date.now().toString().slice(-8)}`;

    return this.prisma.payment.create({
      data: {
        transactionId,
        invoiceNumber,
        payerName: data.payerName,
        payerEmail: data.payerEmail,
        amount: Number(data.amount),
        paymentType: data.paymentType,
        paymentMethod: data.paymentMethod || 'UPI',
        bookingId: data.bookingId,
        status: PaymentStatus.SUCCESS,
      },
      include: {
        booking: {
          include: { room: true },
        },
      },
    });
  }
}
