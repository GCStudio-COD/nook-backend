import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface OtpRecord {
  code: string;
  expiresAt: number;
}

@Injectable()
export class AuthService {
  // In-memory store for OTPs: phone -> { code, expiresAt }
  private otpStore = new Map<string, OtpRecord>();

  constructor(private prisma: PrismaService) {}

  async sendOtp(phone: string, channel: 'SMS' | 'WHATSAPP' = 'SMS') {
    if (!phone || phone.trim().length < 8) {
      throw new BadRequestException('A valid mobile number is required');
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes validity

    this.otpStore.set(cleanPhone, { code, expiresAt });

    console.log(`[AuthService] OTP for ${cleanPhone} [Channel: ${channel}]: ${code}`);

    return {
      success: true,
      message: `Verification code dispatched via ${channel} to ${cleanPhone}`,
      phone: cleanPhone,
      otp: code, // returned for demo testing convenience
      expiresInSeconds: 300,
    };
  }

  async verifyOtp(phone: string, otp: string) {
    if (!phone || !otp) {
      throw new BadRequestException('Phone number and OTP are required');
    }

    const cleanPhone = phone.replace(/[^0-9+]/g, '');
    const cleanOtp = otp.trim();

    // Master test code for seamless demonstration
    const isMasterCode = cleanOtp === '123456';

    const record = this.otpStore.get(cleanPhone);
    const isValidStored = record && record.code === cleanOtp && record.expiresAt > Date.now();

    if (!isMasterCode && !isValidStored) {
      throw new BadRequestException('Invalid or expired verification code');
    }

    // Clean up stored OTP once verified
    this.otpStore.delete(cleanPhone);

    // Look for existing resident/admission or generate resident profile
    let residentName = 'Marcus Vance';
    let roomNumber = '204';

    try {
      const admission = await this.prisma.admission.findFirst({
        where: { phone: { contains: cleanPhone.slice(-8) } },
        include: { assignedRoom: true },
      });

      if (admission) {
        residentName = admission.fullName;
        if (admission.assignedRoom) {
          roomNumber = admission.assignedRoom.roomNumber;
        }
      }
    } catch (e) {
      // fallback
    }

    return {
      success: true,
      token: `saltmere-auth-jwt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      resident: {
        name: residentName,
        phone: cleanPhone,
        roomNumber,
        status: 'ACTIVE_RESIDENT',
      },
    };
  }
}
