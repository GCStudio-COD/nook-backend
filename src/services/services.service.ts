import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ServiceType, ServiceStatus, UrgencyLevel } from '@prisma/client';

@Injectable()
export class ServicesService {
  constructor(private prisma: PrismaService) {}

  async findAll(query?: {
    status?: ServiceStatus;
    serviceType?: ServiceType;
    urgency?: UrgencyLevel;
    roomNumber?: string;
  }) {
    const where: any = {};
    if (query?.status) where.status = query.status;
    if (query?.serviceType) where.serviceType = query.serviceType;
    if (query?.urgency) where.urgency = query.urgency;
    if (query?.roomNumber) {
      where.roomNumber = { contains: query.roomNumber, mode: 'insensitive' };
    }

    return this.prisma.serviceRequest.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const request = await this.prisma.serviceRequest.findUnique({ where: { id } });
    if (!request) throw new NotFoundException(`Service request ${id} not found`);
    return request;
  }

  async create(data: {
    residentName: string;
    residentPhone: string;
    roomNumber: string;
    serviceType: ServiceType;
    preferredDate: string;
    timeSlot: string;
    urgency?: UrgencyLevel;
    instructions?: string;
  }) {
    if (!data.residentName || !data.residentPhone || !data.roomNumber || !data.serviceType) {
      throw new BadRequestException('Resident name, phone, room number, and service type are required');
    }

    return this.prisma.serviceRequest.create({
      data: {
        residentName: data.residentName,
        residentPhone: data.residentPhone,
        roomNumber: data.roomNumber.toUpperCase(),
        serviceType: data.serviceType,
        preferredDate: new Date(data.preferredDate || new Date()),
        timeSlot: data.timeSlot || '09:00 AM - 11:00 AM',
        urgency: data.urgency || UrgencyLevel.NORMAL,
        instructions: data.instructions,
        status: ServiceStatus.REQUESTED,
      },
    });
  }

  async updateStatus(
    id: string,
    data: {
      status?: ServiceStatus;
      assignedStaff?: string;
      resolutionNotes?: string;
      feedbackRating?: number;
    },
  ) {
    await this.findOne(id);
    return this.prisma.serviceRequest.update({
      where: { id },
      data: {
        status: data.status,
        assignedStaff: data.assignedStaff,
        resolutionNotes: data.resolutionNotes,
      },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.serviceRequest.delete({ where: { id } });
  }
}
