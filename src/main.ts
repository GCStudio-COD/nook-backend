import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, RequestMethod } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('HostelBackend');
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend Next.js app
  app.enableCors({
    origin: (origin, callback) => {
      // allow requests with no origin (like mobile apps, curl, server-to-server) or localhost
      if (!origin || origin.includes('localhost') || origin.includes('127.0.0.1')) {
        callback(null, true);
      } else {
        callback(null, true);
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Set global prefix for API endpoints, while keeping /admin directly accessible in the browser
  app.setGlobalPrefix('api', {
    exclude: [
      { path: 'admin', method: RequestMethod.GET },
      { path: 'admin/ui', method: RequestMethod.GET },
      { path: 'admin/admissions', method: RequestMethod.GET },
      { path: 'admin/billing', method: RequestMethod.GET },
      { path: 'admin/rooms', method: RequestMethod.GET },
      { path: 'admin/maintenance', method: RequestMethod.GET },
      { path: 'admin/hostels', method: RequestMethod.GET },
      { path: 'admin/floorplan', method: RequestMethod.GET },
    ],
  });

  // Use ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: false,
    }),
  );

  const port = process.env.PORT || 5000;
  await app.listen(port, '0.0.0.0');
  logger.log(`=======================================================`);
  logger.log(`🏨 Hostel Booking NestJS API is running on http://localhost:${port}/api`);
  logger.log(`   - 🛡️ Admin Dashboard: http://localhost:${port}/admin (served directly from backend)`);
  logger.log(`   - Rooms:        http://localhost:${port}/api/rooms`);
  logger.log(`   - Admissions:   http://localhost:${port}/api/admissions`);
  logger.log(`   - Bookings:     http://localhost:${port}/api/bookings`);
  logger.log(`   - Services:     http://localhost:${port}/api/services`);
  logger.log(`   - Payments:     http://localhost:${port}/api/payments`);
  logger.log(`   - Facilities:   http://localhost:${port}/api/facilities`);
  logger.log(`=======================================================`);
}

bootstrap();
