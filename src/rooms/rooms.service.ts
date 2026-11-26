import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { RoomType, SharingType, RoomStatus, BookingStatus, AdmissionStatus, PaymentType, PaymentStatus } from '@prisma/client';

@Injectable()
export class RoomsService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: {
    hostelId?: string;
    type?: RoomType;
    sharing?: SharingType;
    floor?: number;
    status?: RoomStatus;
    vacantOnly?: boolean;
    search?: string;
  }) {
    const where: any = {};

    if (query?.hostelId && query.hostelId !== 'ALL') where.hostelId = query.hostelId;
    if (query?.type) where.type = query.type;
    if (query?.sharing) where.sharing = query.sharing;
    if (query?.floor !== undefined && !isNaN(Number(query.floor))) where.floor = Number(query.floor);
    if (query?.status) where.status = query.status;

    if (query?.search) {
      where.OR = [
        { roomNumber: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
      ];
    }

    const rooms = await this.prisma.room.findMany({
      where,
      include: {
        hostel: {
          select: { id: true, name: true, code: true },
        },
        bookings: {
          where: { status: 'CONFIRMED' },
          select: {
            id: true,
            bookingNumber: true,
            residentName: true,
            residentEmail: true,
            residentPhone: true,
            checkInDate: true,
            monthlyRent: true,
          },
        },
        admissions: {
          where: { status: 'ADMITTED' },
          select: {
            id: true,
            fullName: true,
            email: true,
            phone: true,
            dateOfBirth: true,
            collegeOrWork: true,
            admittedAt: true,
            createdAt: true,
          },
        },
      },
      orderBy: [{ floor: 'asc' }, { roomNumber: 'asc' }],
    });

    const transformed = rooms.map((room) => {
      // Deduplicate occupants across bookings and admissions
      const occupants: Array<{
        name: string;
        email: string;
        phone: string;
        type: 'BOOKING' | 'ADMISSION';
        bookingId: string | null;
        admissionId: string | null;
        bookingNumber: string | null;
        checkInDate: Date | null;
      }> = [];

      for (const b of room.bookings) {
        occupants.push({
          name: b.residentName,
          email: b.residentEmail,
          phone: b.residentPhone,
          type: 'BOOKING',
          bookingId: b.id,
          admissionId: null,
          bookingNumber: b.bookingNumber,
          checkInDate: b.checkInDate,
        });
      }

      for (const a of room.admissions) {
        const key = a.fullName.trim().toLowerCase();
        const existing = occupants.find((o) => o.name.trim().toLowerCase() === key);
        if (existing) {
          existing.admissionId = a.id;
        } else {
          occupants.push({
            name: a.fullName,
            email: a.email,
            phone: a.phone,
            type: 'ADMISSION',
            bookingId: null,
            admissionId: a.id,
            bookingNumber: null,
            checkInDate: a.admittedAt || a.createdAt,
          });
        }
      }

      const beds = Array.from({ length: room.capacity }, (_, idx) => {
        const bedIndex = idx + 1;
        const isOccupied = bedIndex <= room.occupiedBeds;
        const occupant = isOccupied ? occupants[idx] || null : null;
        return {
          bedNumber: bedIndex,
          isOccupied,
          occupantName: occupant ? occupant.name : isOccupied ? `Resident ${bedIndex}` : null,
          occupantEmail: occupant?.email || null,
          occupantPhone: occupant?.phone || null,
          bookingId: occupant?.bookingId || null,
          admissionId: occupant?.admissionId || null,
          bookingNumber: occupant?.bookingNumber || null,
          checkInDate: occupant?.checkInDate || null,
        };
      });

      const vacantBeds = Math.max(0, room.capacity - room.occupiedBeds);
      const isVacant = vacantBeds > 0 && room.status === RoomStatus.AVAILABLE;

      return {
        ...room,
        vacantBeds,
        peopleCount: room.occupiedBeds,
        isVacant,
        beds,
        occupants,
      };
    });

    if (query?.vacantOnly) {
      return transformed.filter((r) => r.isVacant);
    }

    return transformed;
  }

  async getStats(hostelId?: string) {
    const where: any = {};
    if (hostelId && hostelId !== 'ALL') where.hostelId = hostelId;

    const rooms = await this.prisma.room.findMany({ where });
    const totalRooms = rooms.length;
    const totalCapacity = rooms.reduce((acc, r) => acc + r.capacity, 0);
    const occupiedBeds = rooms.reduce((acc, r) => acc + r.occupiedBeds, 0);
    const vacantBeds = Math.max(0, totalCapacity - occupiedBeds);
    const vacantRooms = rooms.filter(
      (r) => r.capacity > r.occupiedBeds && r.status === RoomStatus.AVAILABLE,
    ).length;
    const occupancyRate = totalCapacity > 0 ? Math.round((occupiedBeds / totalCapacity) * 100) : 0;

    const byType = {
      SINGLE: rooms.filter((r) => r.type === RoomType.SINGLE || r.sharing === SharingType.SINGLE).length,
      DORMITORY: rooms.filter((r) => r.type === RoomType.DORMITORY || r.capacity >= 4).length,
      DELUXE: rooms.filter((r) => r.type === RoomType.DELUXE || r.type === RoomType.DELUXE_AC || r.type === RoomType.SUPER_DELUXE_AC).length,
      DELUXE_AC: rooms.filter((r) => r.type === RoomType.DELUXE_AC).length,
      SUPER_DELUXE_AC: rooms.filter((r) => r.type === RoomType.SUPER_DELUXE_AC).length,
      NORMAL_NON_AC: rooms.filter((r) => r.type === RoomType.NORMAL_NON_AC).length,
      STANDARD_NON_AC: rooms.filter((r) => r.type === RoomType.STANDARD_NON_AC).length,
    };

    return {
      totalRooms,
      totalCapacity,
      occupiedBeds,
      vacantBeds,
      vacantRooms,
      occupancyRate,
      byType,
    };
  }

  async get2DLayout(hostelId?: string, floor?: number) {
    // 1. Resolve target hostel
    let hostel = null;
    if (hostelId && hostelId !== 'ALL') {
      hostel = await this.prisma.hostel.findUnique({
        where: { id: hostelId },
      });
    }

    if (!hostel) {
      hostel = await this.prisma.hostel.findFirst({
        orderBy: { createdAt: 'asc' },
      });
    }

    const where: any = {};
    if (hostel) {
      where.hostelId = hostel.id;
    }

    // Determine target floor
    const selectedFloor = floor ? Number(floor) : 1;
    where.floor = selectedFloor;

    const rooms = await this.prisma.room.findMany({
      where,
      include: {
        bookings: {
          where: { status: 'CONFIRMED' },
          select: { id: true, residentName: true, checkInDate: true },
        },
        admissions: {
          where: { status: 'ADMITTED' },
          select: { id: true, fullName: true },
        },
      },
      orderBy: [{ wing: 'asc' }, { positionX: 'asc' }, { roomNumber: 'asc' }],
    });

    const transformedRooms = rooms.map((room) => {
      const occupants: Array<{
        name: string;
        type: 'BOOKING' | 'ADMISSION';
        bookingId: string | null;
        admissionId: string | null;
      }> = [];

      for (const b of room.bookings) {
        occupants.push({
          name: b.residentName,
          type: 'BOOKING',
          bookingId: b.id,
          admissionId: null,
        });
      }

      for (const a of room.admissions) {
        const key = a.fullName.trim().toLowerCase();
        const existing = occupants.find((o) => o.name.trim().toLowerCase() === key);
        if (existing) {
          existing.admissionId = a.id;
        } else {
          occupants.push({
            name: a.fullName,
            type: 'ADMISSION',
            bookingId: null,
            admissionId: a.id,
          });
        }
      }

      const beds = Array.from({ length: room.capacity }, (_, idx) => {
        const bedIndex = idx + 1;
        const isOccupied = bedIndex <= room.occupiedBeds;
        const occ = isOccupied ? occupants[idx] || null : null;
        return {
          bedNumber: bedIndex,
          isOccupied,
          occupantName: occ ? occ.name : isOccupied ? `Resident ${bedIndex}` : null,
          bookingId: occ?.bookingId || null,
          admissionId: occ?.admissionId || null,
        };
      });

      return {
        ...room,
        vacantBeds: Math.max(0, room.capacity - room.occupiedBeds),
        isVacant: room.capacity > room.occupiedBeds && room.status === RoomStatus.AVAILABLE,
        beds,
      };
    });

    // Available floors for this hostel
    const totalFloors = hostel?.totalFloors || 3;
    const floorList = Array.from({ length: totalFloors }, (_, i) => i + 1);

    const floorStats = {
      totalRooms: transformedRooms.length,
      totalCapacity: transformedRooms.reduce((sum, r) => sum + r.capacity, 0),
      occupiedBeds: transformedRooms.reduce((sum, r) => sum + r.occupiedBeds, 0),
      vacantBeds: transformedRooms.reduce((sum, r) => sum + r.vacantBeds, 0),
    };

    return {
      hostel,
      floors: floorList,
      activeFloor: selectedFloor,
      wings: ['West', 'East'],
      stats: floorStats,
      rooms: transformedRooms,
    };
  }

  async findOne(id: string) {
    const room = await this.prisma.room.findUnique({
      where: { id },
      include: {
        hostel: { select: { id: true, name: true, code: true, facilities: true } },
        bookings: {
          where: { status: 'CONFIRMED' },
          select: { id: true, residentName: true, checkInDate: true },
        },
        admissions: {
          where: { status: 'ADMITTED' },
          select: { id: true, fullName: true, phone: true },
        },
      },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${id} not found`);
    }

    return {
      ...room,
      vacantBeds: Math.max(0, room.capacity - room.occupiedBeds),
      isVacant: room.capacity > room.occupiedBeds && room.status === RoomStatus.AVAILABLE,
    };
  }

  async create(data: any) {
    // If hostelId not provided, link to first available hostel
    let hostelId = data.hostelId;
    if (!hostelId) {
      const defaultHostel = await this.prisma.hostel.findFirst();
      if (defaultHostel) hostelId = defaultHostel.id;
    }

    return this.prisma.room.create({
      data: {
        roomNumber: data.roomNumber.toUpperCase(),
        floor: Number(data.floor || 1),
        hostelId,
        type: data.type || RoomType.DELUXE,
        sharing: data.sharing || SharingType.SINGLE,
        capacity: Number(data.capacity || 1),
        occupiedBeds: Number(data.occupiedBeds || 0),
        priceMonthly: Number(data.priceMonthly || 8500),
        securityDeposit: Number(data.securityDeposit || 10000),
        amenities: data.amenities || [],
        images: data.images || [],
        description: data.description || '',
        status: data.status || RoomStatus.AVAILABLE,
        positionX: Number(data.positionX || 0),
        positionY: Number(data.positionY || 0),
        wing: data.wing || 'East',
      },
      include: {
        hostel: true,
      },
    });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.room.update({
      where: { id },
      data: {
        ...data,
        roomNumber: data.roomNumber ? data.roomNumber.toUpperCase() : undefined,
        floor: data.floor !== undefined ? Number(data.floor) : undefined,
        capacity: data.capacity !== undefined ? Number(data.capacity) : undefined,
        occupiedBeds: data.occupiedBeds !== undefined ? Number(data.occupiedBeds) : undefined,
        priceMonthly: data.priceMonthly !== undefined ? Number(data.priceMonthly) : undefined,
        securityDeposit: data.securityDeposit !== undefined ? Number(data.securityDeposit) : undefined,
        positionX: data.positionX !== undefined ? Number(data.positionX) : undefined,
        positionY: data.positionY !== undefined ? Number(data.positionY) : undefined,
      },
      include: {
        hostel: true,
      },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.room.delete({ where: { id } });
  }

  async assignStudent(roomId: string, data: {
    admissionId?: string;
    residentName?: string;
    residentEmail?: string;
    residentPhone?: string;
    bedNumber?: number;
    monthlyRent?: number;
    securityDeposit?: number;
    checkInDate?: string;
    tenureMonths?: number;
    paymentMethod?: string;
  }) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    if (room.occupiedBeds >= room.capacity) {
      throw new BadRequestException(`Room ${room.roomNumber} has no vacant beds available (Capacity: ${room.capacity}/${room.capacity}).`);
    }

    let studentName = data.residentName?.trim();
    let studentEmail = data.residentEmail?.trim();
    let studentPhone = data.residentPhone?.trim();

    let targetAdmission: any = null;
    if (data.admissionId) {
      targetAdmission = await this.prisma.admission.findUnique({
        where: { id: data.admissionId },
      });
      if (!targetAdmission) {
        throw new NotFoundException(`Admission applicant with ID ${data.admissionId} not found`);
      }
      studentName = targetAdmission.fullName;
      studentEmail = targetAdmission.email || studentEmail;
      studentPhone = targetAdmission.phone || studentPhone;
    }

    if (!studentName) {
      throw new BadRequestException('Student or resident name is required for bed allocation.');
    }

    const tenure = Math.max(1, Number(data.tenureMonths || 1));
    const rent = data.monthlyRent !== undefined ? Number(data.monthlyRent) : room.priceMonthly;
    const deposit = data.securityDeposit !== undefined ? Number(data.securityDeposit) : room.securityDeposit;
    const totalAmount = rent * tenure + deposit;
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const bookingNumber = `HST-2026-${randomSuffix}`;

    return this.prisma.$transaction(async (tx) => {
      // 1. If admission applicant, update admission status to ADMITTED and link to room
      if (targetAdmission) {
        await tx.admission.update({
          where: { id: targetAdmission.id },
          data: {
            status: AdmissionStatus.ADMITTED,
            assignedRoomId: room.id,
            admittedAt: new Date(),
          },
        });
      }

      // 2. Create Confirmed Booking record
      const booking = await tx.booking.create({
        data: {
          bookingNumber,
          residentName: studentName,
          residentEmail: studentEmail || `${studentName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@student.aura.edu`,
          residentPhone: studentPhone || '+91 98000 00000',
          roomId: room.id,
          checkInDate: data.checkInDate ? new Date(data.checkInDate) : new Date(),
          tenureMonths: tenure,
          monthlyRent: rent,
          securityDeposit: deposit,
          totalAmount,
          status: BookingStatus.CONFIRMED,
        },
      });

      // 3. Update room occupancy
      const newOccupied = room.occupiedBeds + 1;
      const updatedRoom = await tx.room.update({
        where: { id: room.id },
        data: {
          occupiedBeds: newOccupied,
          status: newOccupied >= room.capacity ? RoomStatus.FULL : RoomStatus.AVAILABLE,
        },
        include: {
          hostel: true,
        },
      });

      // 4. Create Ledger Payment Record
      const invoiceNumber = `INV-${Date.now().toString().slice(-6)}`;
      const transactionId = `TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
      await tx.payment.create({
        data: {
          transactionId,
          invoiceNumber,
          bookingId: booking.id,
          payerName: studentName,
          payerEmail: studentEmail || `${studentName.toLowerCase().replace(/[^a-z0-9]/g, '.')}@student.aura.edu`,
          amount: totalAmount,
          paymentType: PaymentType.ROOM_RENT,
          paymentMethod: data.paymentMethod || 'Direct Admin Intake',
          status: PaymentStatus.SUCCESS,
        },
      });

      return {
        success: true,
        message: `Successfully allocated Bed ${data.bedNumber || newOccupied} in Room ${room.roomNumber} to ${studentName}`,
        booking,
        room: updatedRoom,
      };
    });
  }

  async unassignStudent(roomId: string, data: {
    bookingId?: string;
    admissionId?: string;
    residentName?: string;
  }) {
    const room = await this.prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      throw new NotFoundException(`Room with ID ${roomId} not found`);
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. If bookingId provided, complete the booking
      if (data.bookingId) {
        await tx.booking.update({
          where: { id: data.bookingId },
          data: { status: BookingStatus.COMPLETED },
        });
      } else if (data.residentName) {
        const found = await tx.booking.findFirst({
          where: { roomId: room.id, residentName: data.residentName, status: BookingStatus.CONFIRMED },
        });
        if (found) {
          await tx.booking.update({
            where: { id: found.id },
            data: { status: BookingStatus.COMPLETED },
          });
        }
      }

      // 2. If admissionId provided, revert to APPROVED or clear room
      if (data.admissionId) {
        await tx.admission.update({
          where: { id: data.admissionId },
          data: { status: AdmissionStatus.APPROVED, assignedRoomId: null },
        });
      } else if (data.residentName) {
        const foundAdm = await tx.admission.findFirst({
          where: { assignedRoomId: room.id, fullName: data.residentName },
        });
        if (foundAdm) {
          await tx.admission.update({
            where: { id: foundAdm.id },
            data: { status: AdmissionStatus.APPROVED, assignedRoomId: null },
          });
        }
      }

      // 3. Decrement occupied beds
      const newOccupied = Math.max(0, room.occupiedBeds - 1);
      const updatedRoom = await tx.room.update({
        where: { id: room.id },
        data: {
          occupiedBeds: newOccupied,
          status: RoomStatus.AVAILABLE,
        },
      });

      return {
        success: true,
        message: `Bed vacated in Room ${room.roomNumber}. Current occupants: ${newOccupied}/${room.capacity}`,
        room: updatedRoom,
      };
    });
  }
}
