export type NotificationCategory = 'ADMISSION' | 'MAINTENANCE' | 'PAYMENT' | 'OCCUPANCY' | 'SYSTEM';
export type NotificationUrgency = 'LOW' | 'NORMAL' | 'HIGH' | 'EMERGENCY';

export interface AdminNotification {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  urgency: NotificationUrgency;
  createdAt: string;
  isRead: boolean;
  actionUrl: string;
  actionLabel: string;
  metadata?: Record<string, any>;
}

export interface NotificationResponse {
  notifications: AdminNotification[];
  unreadCount: number;
  summary: {
    admissions: number;
    maintenance: number;
    payments: number;
    occupancy: number;
    system: number;
  };
}

export interface CreateNotificationDto {
  title: string;
  message: string;
  category: NotificationCategory;
  urgency?: NotificationUrgency;
  actionUrl?: string;
  actionLabel?: string;
}
