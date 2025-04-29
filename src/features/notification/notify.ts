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

  if (Notification.permission === 'granted') {
    new Notification(title, options);
    return true;
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        new Notification(title, options);
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
