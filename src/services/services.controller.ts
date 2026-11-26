import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServiceType, ServiceStatus, UrgencyLevel } from '@prisma/client';

@Controller('services')
export class ServicesController {
  constructor(private readonly servicesService: ServicesService) {}

  @Get()
  findAll(
    @Query('status') status?: ServiceStatus,
    @Query('serviceType') serviceType?: ServiceType,
    @Query('urgency') urgency?: UrgencyLevel,
    @Query('roomNumber') roomNumber?: string,
  ) {
    return this.servicesService.findAll({ status, serviceType, urgency, roomNumber });
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.servicesService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.servicesService.create(body);
  }

  @Put(':id')
  updateStatus(@Param('id') id: string, @Body() body: any) {
    return this.servicesService.updateStatus(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.servicesService.delete(id);
  }
}
