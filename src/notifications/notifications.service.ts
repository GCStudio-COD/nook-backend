import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  AdminNotification,
  NotificationResponse,
  CreateNotificationDto,
} from './notifications.types';

@Injectable()
export class NotificationsService {
  private readIds: Set<string> = new Set();
  private dismissedIds: Set<string> = new Set();
  private customNotifications: AdminNotification[] = [
    {
      id: 'system-welcome',
      title: 'Aura ERP System Online',
      message: 'All campus microservices, database, and telemetry channels are synchronized.',
      category: 'SYSTEM',
      urgency: 'LOW',
      createdAt: new Date().toISOString(),
      isRead: false,
      actionUrl: '/admin',
      actionLabel: 'View Dashboard',
    },
  ];

  constructor(private prisma: PrismaService) {}

  async getAll(): Promise<NotificationResponse> {
    const list: AdminNotification[] = [];

    try {
      // 1. Pending Admissions
      const pendingAdmissions = await this.prisma.admission.findMany({
        where: { status: 'PENDING' },
        orderBy: { createdAt: 'desc' },
        take: 6,
      });

      for (const adm of pendingAdmissions) {
        const id = `admission-${adm.id}`;
        if (!this.dismissedIds.has(id)) {
          list.push({
            id,
            title: `New Admission: ${adm.fullName}`,
            message: `Applied for ${adm.roomTypePreference.replace(/_/g, ' ')} room. Contact: ${adm.phone}`,
            category: 'ADMISSION',
            urgency: 'NORMAL',
            createdAt: adm.createdAt.toISOString(),
            isRead: this.readIds.has(id),
            actionUrl: '/admin/admissions',
            actionLabel: 'Review Intake',
          });
        }
      }

      // 2. Open / Emergency Maintenance Requests
      const openServices = await this.prisma.serviceRequest.findMany({
        where: { status: { in: ['REQUESTED', 'IN_PROGRESS'] } },
        orderBy: { createdAt: 'desc' },
        take: 6,
      });

      for (const srv of openServices) {
        const id = `service-${srv.id}`;
        if (!this.dismissedIds.has(id)) {
          const isEmergency = srv.urgency === 'EMERGENCY';
          list.push({
            id,
            title: `${isEmergency ? '🚨 URGENT: ' : '🛠️ '}${srv.serviceType.replace(/_/g, ' ')} in Room ${srv.roomNumber}`,
            message: `Reported by ${srv.residentName} (${srv.residentPhone}): ${srv.instructions || 'Needs technician inspection.'}`,
            category: 'MAINTENANCE',
            urgency: srv.urgency as any,
            createdAt: srv.createdAt.toISOString(),
            isRead: this.readIds.has(id),
            actionUrl: '/admin/maintenance',
            actionLabel: 'Dispatch Staff',
          });
        }
      }

      // 3. Recent Ledger Payments
      const recentPayments = await this.prisma.payment.findMany({
        orderBy: { paidAt: 'desc' },
        take: 6,
      });

      for (const pay of recentPayments) {
        const id = `payment-${pay.id}`;
        if (!this.dismissedIds.has(id)) {
          list.push({
            id,
            title: `Payment Received: ₹${pay.amount.toLocaleString('en-IN')}`,
            message: `From ${pay.payerName} for ${pay.paymentType.replace(/_/g, ' ')} via ${pay.paymentMethod}.`,
            category: 'PAYMENT',
            urgency: 'LOW',
            createdAt: pay.paidAt.toISOString(),
            isRead: this.readIds.has(id),
            actionUrl: '/admin/billing',
            actionLabel: 'View Receipt',
          });
        }
      }

      // 4. Low Vacancy / Full Room Alerts
      const fullRooms = await this.prisma.room.findMany({
        where: { status: 'FULL' },
        take: 4,
      });

      for (const room of fullRooms) {
        const id = `room-full-${room.id}`;
        if (!this.dismissedIds.has(id)) {
          const wingName = (room as any).wing || 'East';
          list.push({
            id,
            title: `Room ${room.roomNumber} Fully Occupied`,
            message: `All ${room.capacity} beds are occupied in ${wingName} wing (Floor ${room.floor}).`,
            category: 'OCCUPANCY',
            urgency: 'LOW',
            createdAt: room.updatedAt.toISOString(),
            isRead: this.readIds.has(id),
            actionUrl: '/admin/rooms',
            actionLabel: 'Check Room',
          });
        }
      }
    } catch (e) {
      console.error('[NotificationsService] Error fetching database alerts:', e);
    }

    // 5. Append Custom Notifications
    for (const cn of this.customNotifications) {
      if (!this.dismissedIds.has(cn.id)) {
        list.push({
          ...cn,
          isRead: this.readIds.has(cn.id),
        });
      }
    }

    // Sort: EMERGENCY first, then newest first
    list.sort((a, b) => {
      if (a.urgency === 'EMERGENCY' && b.urgency !== 'EMERGENCY') return -1;
      if (b.urgency === 'EMERGENCY' && a.urgency !== 'EMERGENCY') return 1;
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    const unreadCount = list.filter((n) => !n.isRead).length;

    const summary = {
      admissions: list.filter((n) => n.category === 'ADMISSION').length,
      maintenance: list.filter((n) => n.category === 'MAINTENANCE').length,
      payments: list.filter((n) => n.category === 'PAYMENT').length,
      occupancy: list.filter((n) => n.category === 'OCCUPANCY').length,
      system: list.filter((n) => n.category === 'SYSTEM').length,
    };

    return {
      notifications: list,
      unreadCount,
      summary,
    };
  }

  markAsRead(id: string): { success: boolean; id: string } {
    this.readIds.add(id);
    return { success: true, id };
  }

  markAllAsRead(allIds?: string[]): { success: boolean; count: number } {
    if (allIds && Array.isArray(allIds)) {
      allIds.forEach((id) => this.readIds.add(id));
    }
    return { success: true, count: this.readIds.size };
  }

  dismiss(id: string): { success: boolean; id: string } {
    this.dismissedIds.add(id);
    return { success: true, id };
  }

  clearAll(): { success: boolean } {
    this.customNotifications = [];
    return { success: true };
  }

  create(dto: CreateNotificationDto): AdminNotification {
    const notif: AdminNotification = {
      id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 5)}`,
      title: dto.title,
      message: dto.message,
      category: dto.category || 'SYSTEM',
      urgency: dto.urgency || 'NORMAL',
      createdAt: new Date().toISOString(),
      isRead: false,
      actionUrl: dto.actionUrl || '/admin',
      actionLabel: dto.actionLabel || 'View Details',
    };
    this.customNotifications.unshift(notif);
    return notif;
  }

  async getStudentNotifications(studentName = 'Marcus Vance', roomNumber = '204') {
    const list: any[] = [];

    try {
      // 1. Service requests for this room or resident
      const requests = await this.prisma.serviceRequest.findMany({
        where: {
          OR: [
            { roomNumber: { contains: roomNumber } },
            { residentName: { contains: studentName } },
          ],
        },
        orderBy: { updatedAt: 'desc' },
        take: 4,
      });

      for (const req of requests) {
        list.push({
          id: `std-service-${req.id}`,
          title: `Maintenance: ${req.serviceType.replace(/_/g, ' ')}`,
          message: `Ticket status is ${req.status}. ${req.assignedStaff ? `Staff: ${req.assignedStaff}.` : 'Pending dispatch.'}`,
          category: 'MAINTENANCE',
          urgency: req.urgency,
          createdAt: req.updatedAt.toISOString(),
          isRead: this.readIds.has(`std-service-${req.id}`),
          targetTab: 'maintenance',
        });
      }

      // 2. Payments for this resident
      const payments = await this.prisma.payment.findMany({
        orderBy: { paidAt: 'desc' },
        take: 3,
      });

      for (const pay of payments) {
        list.push({
          id: `std-payment-${pay.id}`,
          title: `Receipt Reconciled: ₹${pay.amount.toLocaleString('en-IN')}`,
          message: `Verified payment for ${pay.paymentType.replace(/_/g, ' ')} via ${pay.paymentMethod}. Txn: ${pay.transactionId}`,
          category: 'PAYMENT',
          urgency: 'LOW',
          createdAt: pay.paidAt.toISOString(),
          isRead: this.readIds.has(`std-payment-${pay.id}`),
          targetTab: 'fees',
        });
      }
    } catch (e) {
      console.error('[NotificationsService] Error loading student alerts:', e);
    }

    // 3. Campus Notices & Operational Announcements
    const defaultAnnouncements = [
      {
        id: 'std-notice-wifi',
        title: '📶 High-Speed Campus 5G Active',
        message: 'Floor 2 Wi-Fi mesh upgraded. Password available in room overview.',
        category: 'SYSTEM',
        urgency: 'LOW',
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        isRead: this.readIds.has('std-notice-wifi'),
        targetTab: 'room',
      },
      {
        id: 'std-notice-curfew',
        title: '⏰ Evening Gate Curfew at 10:30 PM',
        message: 'Ensure biometric attendance is logged at the security gate before curfew hours.',
        category: 'SYSTEM',
        urgency: 'NORMAL',
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        isRead: this.readIds.has('std-notice-curfew'),
        targetTab: 'attendance',
      },
      {
        id: 'std-notice-mess',
        title: '🍽️ Weekly Dining Hall Special',
        message: 'South Indian coastal breakfast and dinner menu updated in Mess section.',
        category: 'SYSTEM',
        urgency: 'LOW',
        createdAt: new Date(Date.now() - 86400000).toISOString(),
        isRead: this.readIds.has('std-notice-mess'),
        targetTab: 'mess',
      },
    ];

    for (const ann of defaultAnnouncements) {
      if (!this.dismissedIds.has(ann.id)) {
        list.push(ann);
      }
    }

    // 4. Any custom notices created by Admin
    for (const cn of this.customNotifications) {
      if (!this.dismissedIds.has(`std-custom-${cn.id}`)) {
        list.push({
          id: `std-custom-${cn.id}`,
          title: cn.title,
          message: cn.message,
          category: cn.category,
          urgency: cn.urgency,
          createdAt: cn.createdAt,
          isRead: this.readIds.has(`std-custom-${cn.id}`),
          targetTab: 'notices',
        });
      }
    }

    // Sort by createdAt descending
    list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    const unreadCount = list.filter((n) => !n.isRead).length;

    return {
      notifications: list,
      unreadCount,
    };
  }
}
