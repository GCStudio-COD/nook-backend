import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './notifications.types';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Get()
  async getAll() {
    return this.notificationsService.getAll();
  }

  @Get('student')
  async getStudentNotifications(
    @Query('studentName') name?: string,
    @Query('roomNumber') room?: string,
  ) {
    return this.notificationsService.getStudentNotifications(name, room);
  }

  @Get('resident')
  async getResidentNotifications(
    @Query('residentName') name?: string,
    @Query('roomNumber') room?: string,
  ) {
    return this.notificationsService.getStudentNotifications(name, room);
  }

  @Post(':id/read')
  markAsRead(@Param('id') id: string) {
    return this.notificationsService.markAsRead(id);
  }

  @Post('mark-all-read')
  async markAllAsRead(@Body() body: { ids?: string[] }) {
    if (!body?.ids) {
      const data = await this.notificationsService.getAll();
      const allIds = data.notifications.map((n) => n.id);
      return this.notificationsService.markAllAsRead(allIds);
    }
    return this.notificationsService.markAllAsRead(body.ids);
  }

  @Delete(':id')
  dismiss(@Param('id') id: string) {
    return this.notificationsService.dismiss(id);
  }

  @Post('clear')
  clearAll() {
    return this.notificationsService.clearAll();
  }

  @Post()
  create(@Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(dto);
  }
}
