import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { FacilitiesService } from './facilities.service';

@Controller('facilities')
export class FacilitiesController {
  constructor(private readonly facilitiesService: FacilitiesService) {}

  @Get()
  findAll(@Query('category') category?: string) {
    return this.facilitiesService.findAll(category);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.facilitiesService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.facilitiesService.create(body);
  }
}
