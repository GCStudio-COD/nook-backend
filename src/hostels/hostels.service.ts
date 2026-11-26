import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class HostelsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const hostels = await this.prisma.hostel.findMany({
      include: {
        rooms: {
          select: {
            id: true,
            roomNumber: true,
            floor: true,
            capacity: true,
            occupiedBeds: true,
            status: true,
            type: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return hostels.map((hostel) => {
      const totalRooms = hostel.rooms.length;
      const totalCapacity = hostel.rooms.reduce((acc, r) => acc + (r.capacity || 0), 0);
      const occupiedBeds = hostel.rooms.reduce((acc, r) => acc + (r.occupiedBeds || 0), 0);
      const vacantBeds = Math.max(0, totalCapacity - occupiedBeds);
      const occupancyRate = totalCapacity > 0 ? Math.round((occupiedBeds / totalCapacity) * 100) : 0;

      return {
        ...hostel,
        totalRooms,
        totalCapacity,
        occupiedBeds,
        vacantBeds,
        occupancyRate,
      };
    });
  }

  async findOne(id: string) {
    const hostel = await this.prisma.hostel.findUnique({
      where: { id },
      include: {
        rooms: {
          orderBy: [{ floor: 'asc' }, { roomNumber: 'asc' }],
        },
      },
    });

    if (!hostel) {
      throw new NotFoundException(`Hostel with ID ${id} not found`);
    }

    const totalRooms = hostel.rooms.length;
    const totalCapacity = hostel.rooms.reduce((acc, r) => acc + (r.capacity || 0), 0);
    const occupiedBeds = hostel.rooms.reduce((acc, r) => acc + (r.occupiedBeds || 0), 0);
    const vacantBeds = Math.max(0, totalCapacity - occupiedBeds);
    const occupancyRate = totalCapacity > 0 ? Math.round((occupiedBeds / totalCapacity) * 100) : 0;

    return {
      ...hostel,
      totalRooms,
      totalCapacity,
      occupiedBeds,
      vacantBeds,
      occupancyRate,
    };
  }

  async create(data: {
    name: string;
    code: string;
    address: string;
    city?: string;
    totalFloors?: number;
    description?: string;
    facilities?: string[];
    images?: string[];
  }) {
    const existing = await this.prisma.hostel.findUnique({
      where: { code: data.code.toUpperCase() },
    });

    if (existing) {
      throw new ConflictException(`Hostel with code ${data.code} already exists`);
    }

    return this.prisma.hostel.create({
      data: {
        name: data.name,
        code: data.code.toUpperCase(),
        address: data.address,
        city: data.city || 'Mumbai',
        totalFloors: Number(data.totalFloors || 3),
        description: data.description,
        facilities: data.facilities || [],
        images: data.images || [],
      },
    });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.hostel.update({
      where: { id },
      data: {
        ...data,
        code: data.code ? data.code.toUpperCase() : undefined,
        totalFloors: data.totalFloors !== undefined ? Number(data.totalFloors) : undefined,
      },
    });
  }

  async delete(id: string) {
    await this.findOne(id);
    return this.prisma.hostel.delete({
      where: { id },
    });
  }
}
