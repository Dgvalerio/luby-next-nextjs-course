export interface INotification {
  title: string;
  message: string;
  status: 'success' | 'error' | 'pending';
}

export interface INotificationContext {
  notification: INotification;
  showNotification: (notificationData: INotification) => void;
  hideNotification: () => void;
}
