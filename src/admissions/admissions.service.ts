import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AdmissionStatus, RoomType } from '@prisma/client';

@Injectable()
export class AdmissionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(status?: AdmissionStatus, search?: string) {
    const where: any = {};
    if (status) where.status = status;
    if (search) {
      where.OR = [
        { fullName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
        { phone: { contains: search, mode: 'insensitive' } },
        { idProofNumber: { contains: search, mode: 'insensitive' } },
      ];
    }

    return this.prisma.admission.findMany({
      where,
      include: {
        assignedRoom: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const admission = await this.prisma.admission.findUnique({
      where: { id },
      include: { assignedRoom: true },
    });
    if (!admission) throw new NotFoundException(`Admission ${id} not found`);
    return admission;
  }

  async create(data: {
    fullName: string;
    email: string;
    phone: string;
    gender: string;
    dateOfBirth?: string;
    collegeOrWork?: string;
    guardianName: string;
    guardianPhone: string;
    address: string;
    idProofType: string;
    idProofNumber: string;
    roomTypePreference: RoomType;
    foodPreference?: string;
    notes?: string;
  }) {
    if (!data.fullName || !data.phone || !data.guardianName || !data.guardianPhone) {
      throw new BadRequestException('Required personal and guardian details must be filled');
    }

    return this.prisma.admission.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        gender: data.gender || 'Not specified',
        dateOfBirth: data.dateOfBirth,
        collegeOrWork: data.collegeOrWork,
        guardianName: data.guardianName,
        guardianPhone: data.guardianPhone,
        address: data.address,
        idProofType: data.idProofType,
        idProofNumber: data.idProofNumber,
        roomTypePreference: data.roomTypePreference,
        foodPreference: data.foodPreference,
        notes: data.notes || 'Submitted via Admission Portal',
        status: AdmissionStatus.PENDING,
      },
    });
  }

  async updateStatus(
    id: string,
    update: {
      status: AdmissionStatus;
      assignedRoomId?: string;
      notes?: string;
    },
  ) {
    const admission = await this.findOne(id);

    // If assigning a room and status is ADMITTED, check room capacity and increment occupied beds
    if (update.assignedRoomId && update.status === AdmissionStatus.ADMITTED && admission.status !== AdmissionStatus.ADMITTED) {
      const room = await this.prisma.room.findUnique({
        where: { id: update.assignedRoomId },
      });
      if (!room) throw new NotFoundException('Assigned room not found');
      if (room.occupiedBeds >= room.capacity) {
        throw new BadRequestException(`Room ${room.roomNumber} is already at full capacity`);
      }

      await this.prisma.room.update({
        where: { id: room.id },
        data: {
          occupiedBeds: room.occupiedBeds + 1,
          status: room.occupiedBeds + 1 >= room.capacity ? 'FULL' : 'AVAILABLE',
        },
      });
    }

    return this.prisma.admission.update({
      where: { id },
      data: {
        status: update.status,
        assignedRoomId: update.assignedRoomId || admission.assignedRoomId,
        notes: update.notes !== undefined ? update.notes : admission.notes,
        admittedAt: update.status === AdmissionStatus.ADMITTED ? new Date() : admission.admittedAt,
      },
      include: {
        assignedRoom: true,
      },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.admission.delete({ where: { id } });
  }
}
