export type NotificationType = 'success' | 'error' | 'info';

export type NotificationItem = {
  id: string;
  type: NotificationType;
  message: string;
};

export interface NotificationState {
  notifications: NotificationItem[];
  showNotification: (
    type: NotificationType,
    message: string,
    duration?: number,
  ) => void;
  dismissNotification: (id: string) => void;
}
