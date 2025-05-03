/**
 * Shows a browser notification if permission is granted
 * @param title - Title of the notification
 * @param options - Notification options (body, icon, etc.)
 * @returns Whether the notification was shown
 */
export function notify(title: string, options?: NotificationOptions): boolean {
  if (!('Notification' in window)) {
    console.log('This browser does not support desktop notifications');
    return false;
  }

  const createNotification = () => {
    const notice = new Notification(title, options);
    notice.onshow = () => setTimeout(() => notice.close(), 5000);
  }

  if (Notification.permission === 'granted') {
    createNotification();
    return true;
  }

  if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        createNotification();
      }
    });
    return false;
  }

  return false;
}

/**
 * Sends a test notification to verify that notifications are working
 */
export function sendTestNotification(): void {
  notify('Test Notification', {
    body: 'This is a test notification. If you can see this, notifications are working correctly!',
    icon: '/favicon.ico',
  });
}
