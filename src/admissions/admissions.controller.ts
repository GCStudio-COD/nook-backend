import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { AdmissionsService } from './admissions.service';
import { AdmissionStatus } from '@prisma/client';

@Controller('admissions')
export class AdmissionsController {
  constructor(private readonly admissionsService: AdmissionsService) {}

  @Get()
  findAll(@Query('status') status?: AdmissionStatus, @Query('search') search?: string) {
    return this.admissionsService.findAll(status, search);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.admissionsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.admissionsService.create(body);
  }

  @Put(':id/status')
  updateStatus(@Param('id') id: string, @Body() body: any) {
    return this.admissionsService.updateStatus(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.admissionsService.delete(id);
  }
}
