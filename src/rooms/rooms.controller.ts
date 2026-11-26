import { Controller, Get, Post, Put, Delete, Body, Param, Query } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomType, SharingType, RoomStatus } from '@prisma/client';

@Controller('rooms')
export class RoomsController {
  constructor(private readonly roomsService: RoomsService) {}

  @Get()
  findAll(
    @Query('hostelId') hostelId?: string,
    @Query('type') type?: RoomType,
    @Query('sharing') sharing?: SharingType,
    @Query('floor') floor?: string,
    @Query('status') status?: RoomStatus,
    @Query('vacantOnly') vacantOnly?: string,
    @Query('search') search?: string,
  ) {
    return this.roomsService.findAll({
      hostelId,
      type,
      sharing,
      floor: floor ? Number(floor) : undefined,
      status,
      vacantOnly: vacantOnly === 'true',
      search,
    });
  }

  @Get('stats')
  getStats(@Query('hostelId') hostelId?: string) {
    return this.roomsService.getStats(hostelId);
  }

  @Get('2d-layout')
  get2DLayout(
    @Query('hostelId') hostelId?: string,
    @Query('floor') floor?: string,
  ) {
    return this.roomsService.get2DLayout(hostelId, floor ? Number(floor) : undefined);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.roomsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.roomsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.roomsService.delete(id);
  }

  @Post(':id/assign-student')
  assignStudent(@Param('id') id: string, @Body() body: any) {
    return this.roomsService.assignStudent(id, body);
  }

  @Post(':id/unassign-student')
  unassignStudent(@Param('id') id: string, @Body() body: any) {
    return this.roomsService.unassignStudent(id, body);
  }
}
