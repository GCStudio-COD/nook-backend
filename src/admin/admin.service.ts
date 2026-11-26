import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoomStatus, AdmissionStatus, ServiceStatus, PaymentStatus, UrgencyLevel, RoomType } from '@prisma/client';

@Injectable()
export class AdminService {
  constructor(private prisma: PrismaService) {}

  /**
   * Get comprehensive dashboard metrics & real-time operational feeds for Hostel ERP Admin
   */
  async getDashboardSummary() {
    // 1. Fetch Rooms & Compute Bed Occupancy
    const rooms = await this.prisma.room.findMany();
    const totalRooms = rooms.length;
    const totalCapacity = rooms.reduce((acc, r) => acc + (r.capacity || 0), 0);
    const occupiedBeds = rooms.reduce((acc, r) => acc + (r.occupiedBeds || 0), 0);
    const vacantBeds = Math.max(0, totalCapacity - occupiedBeds);
    const vacantRooms = rooms.filter(
      (r) => r.capacity > r.occupiedBeds && r.status === RoomStatus.AVAILABLE,
    ).length;
    const underMaintenanceRooms = rooms.filter((r) => r.status === RoomStatus.UNDER_MAINTENANCE).length;
    const occupancyRate = totalCapacity > 0 ? Math.round((occupiedBeds / totalCapacity) * 100) : 0;

    // 2. Fetch Admissions Pipeline Counts
    const admissions = await this.prisma.admission.findMany();
    const totalAdmissions = admissions.length;
    const pendingAdmissions = admissions.filter((a) => a.status === AdmissionStatus.PENDING).length;
    const approvedAdmissions = admissions.filter((a) => a.status === AdmissionStatus.APPROVED).length;
    const admittedResidents = admissions.filter((a) => a.status === AdmissionStatus.ADMITTED).length;
    const rejectedAdmissions = admissions.filter((a) => a.status === AdmissionStatus.REJECTED).length;

    // 3. Fetch Payments & Financial Overview
    const payments = await this.prisma.payment.findMany();
    const successfulPayments = payments.filter((p) => p.status === PaymentStatus.SUCCESS);
    const totalRevenue = successfulPayments.reduce((acc, p) => acc + (p.amount || 0), 0);
    const totalTransactions = successfulPayments.length;

    const revenueByType = {
      ROOM_RENT: successfulPayments.filter((p) => p.paymentType === 'ROOM_RENT').reduce((sum, p) => sum + p.amount, 0),
      MESS_FEE: successfulPayments.filter((p) => p.paymentType === 'MESS_FEE').reduce((sum, p) => sum + p.amount, 0),
      ADMISSION_FEE: successfulPayments.filter((p) => p.paymentType === 'ADMISSION_FEE').reduce((sum, p) => sum + p.amount, 0),
      SECURITY_DEPOSIT: successfulPayments.filter((p) => p.paymentType === 'SECURITY_DEPOSIT').reduce((sum, p) => sum + p.amount, 0),
      SERVICE_CHARGE: successfulPayments.filter((p) => p.paymentType === 'SERVICE_CHARGE').reduce((sum, p) => sum + p.amount, 0),
    };

    // 4. Fetch Service & Maintenance Tickets
    const services = await this.prisma.serviceRequest.findMany();
    const totalServiceTickets = services.length;
    const pendingServiceTickets = services.filter((s) => s.status === ServiceStatus.REQUESTED).length;
    const inProgressServiceTickets = services.filter(
      (s) => s.status === ServiceStatus.IN_PROGRESS || s.status === ServiceStatus.ASSIGNED,
    ).length;
    const completedServiceTickets = services.filter((s) => s.status === ServiceStatus.COMPLETED).length;
    const emergencyTickets = services.filter(
      (s) => s.urgency === UrgencyLevel.EMERGENCY && s.status !== ServiceStatus.COMPLETED,
    ).length;

    // 5. Recent Activity Feeds (Latest 5 items per category)
    const recentAdmissions = await this.prisma.admission.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const recentServices = await this.prisma.serviceRequest.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
    });

    const recentBookings = await this.prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        room: { select: { roomNumber: true, type: true } },
      },
      take: 5,
    });

    const recentPayments = await this.prisma.payment.findMany({
      orderBy: { paidAt: 'desc' },
      take: 5,
    });

    return {
      kpi: {
        occupancy: {
          totalRooms,
          totalCapacity,
          occupiedBeds,
          vacantBeds,
          vacantRooms,
          underMaintenanceRooms,
          occupancyRate,
        },
        admissions: {
          total: totalAdmissions,
          pending: pendingAdmissions,
          approved: approvedAdmissions,
          admitted: admittedResidents,
          rejected: rejectedAdmissions,
        },
        financials: {
          totalRevenue,
          totalTransactions,
          revenueByType,
        },
        maintenance: {
          total: totalServiceTickets,
          pending: pendingServiceTickets,
          inProgress: inProgressServiceTickets,
          completed: completedServiceTickets,
          emergency: emergencyTickets,
        },
      },
      feeds: {
        recentAdmissions,
        recentServices,
        recentBookings,
        recentPayments,
      },
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Deep breakdown of room occupancy by floor and room type
   */
  async getOccupancyBreakdown() {
    const rooms = await this.prisma.room.findMany();

    const floorMap: Record<number, { totalBeds: number; occupiedBeds: number; vacantBeds: number; rooms: number }> = {};
    const typeMap: Record<string, { totalBeds: number; occupiedBeds: number; vacantBeds: number; rooms: number }> = {};

    rooms.forEach((r) => {
      // Floor distribution
      if (!floorMap[r.floor]) {
        floorMap[r.floor] = { totalBeds: 0, occupiedBeds: 0, vacantBeds: 0, rooms: 0 };
      }
      floorMap[r.floor].rooms += 1;
      floorMap[r.floor].totalBeds += r.capacity;
      floorMap[r.floor].occupiedBeds += r.occupiedBeds;
      floorMap[r.floor].vacantBeds += Math.max(0, r.capacity - r.occupiedBeds);

      // Type distribution
      if (!typeMap[r.type]) {
        typeMap[r.type] = { totalBeds: 0, occupiedBeds: 0, vacantBeds: 0, rooms: 0 };
      }
      typeMap[r.type].rooms += 1;
      typeMap[r.type].totalBeds += r.capacity;
      typeMap[r.type].occupiedBeds += r.occupiedBeds;
      typeMap[r.type].vacantBeds += Math.max(0, r.capacity - r.occupiedBeds);
    });

    return {
      byFloor: Object.keys(floorMap).map((f) => ({
        floor: Number(f),
        ...floorMap[Number(f)],
        occupancyRate: floorMap[Number(f)].totalBeds > 0
          ? Math.round((floorMap[Number(f)].occupiedBeds / floorMap[Number(f)].totalBeds) * 100)
          : 0,
      })),
      byType: Object.keys(typeMap).map((t) => ({
        type: t,
        ...typeMap[t],
        occupancyRate: typeMap[t].totalBeds > 0
          ? Math.round((typeMap[t].occupiedBeds / typeMap[t].totalBeds) * 100)
          : 0,
      })),
    };
  }

  /**
   * Financial analytics and payment method distribution
   */
  async getFinancialAnalytics() {
    const payments = await this.prisma.payment.findMany({
      where: { status: PaymentStatus.SUCCESS },
      orderBy: { paidAt: 'desc' },
    });

    const totalCollected = payments.reduce((sum, p) => sum + p.amount, 0);

    // Method breakdown (UPI, NetBanking, Card, Cash)
    const byMethod: Record<string, number> = {};
    payments.forEach((p) => {
      byMethod[p.paymentMethod] = (byMethod[p.paymentMethod] || 0) + p.amount;
    });

    return {
      totalCollected,
      totalCount: payments.length,
      byMethod,
      recentTransactions: payments.slice(0, 10),
    };
  }
}
