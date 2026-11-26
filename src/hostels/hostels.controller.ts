import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { HostelsService } from './hostels.service';

@Controller('hostels')
export class HostelsController {
  constructor(private readonly hostelsService: HostelsService) {}

  @Get()
  findAll() {
    return this.hostelsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.hostelsService.findOne(id);
  }

  @Post()
  create(@Body() body: any) {
    return this.hostelsService.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.hostelsService.update(id, body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.hostelsService.delete(id);
  }
}
