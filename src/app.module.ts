import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { RoomsModule } from './rooms/rooms.module';
import { AdmissionsModule } from './admissions/admissions.module';
import { BookingsModule } from './bookings/bookings.module';
import { ServicesModule } from './services/services.module';
import { PaymentsModule } from './payments/payments.module';
import { FacilitiesModule } from './facilities/facilities.module';
import { AdminModule } from './admin/admin.module';

import { HostelsModule } from './hostels/hostels.module';
import { NotificationsModule } from './notifications/notifications.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    HostelsModule,
    RoomsModule,
    AdmissionsModule,
    BookingsModule,
    ServicesModule,
    PaymentsModule,
    FacilitiesModule,
    AdminModule,
    NotificationsModule,
    AuthModule,
  ],
})
export class AppModule {}
