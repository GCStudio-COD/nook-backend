import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FacilitiesService {
  constructor(private prisma: PrismaService) {}

  async findAll(category?: string) {
    const where: any = {};
    if (category) where.category = category;
    return this.prisma.facility.findMany({
      where,
      orderBy: { createdAt: 'asc' },
    });
  }

  async findOne(id: string) {
    const facility = await this.prisma.facility.findUnique({ where: { id } });
    if (!facility) throw new NotFoundException(`Facility ${id} not found`);
    return facility;
  }

  async create(data: {
    name: string;
    category: string;
    description: string;
    icon: string;
    timing: string;
    isIncluded?: boolean;
    features?: string[];
  }) {
    return this.prisma.facility.create({
      data: {
        name: data.name,
        category: data.category,
        description: data.description,
        icon: data.icon || 'Sparkles',
        timing: data.timing || '24/7',
        isIncluded: data.isIncluded !== undefined ? data.isIncluded : true,
        features: data.features || [],
      },
    });
  }
}
