import {useEffect, useState} from 'react';

/**
 * Hook to request notification permission when the app is mounted
 * @returns The current notification permission status
 */
export function useNotificationPermission() {
  const [permission, setPermission] = useState<
    NotificationPermission | 'unsupported'
  >(!('Notification' in window) ? 'unsupported' : Notification.permission);

  useEffect(() => {
    if (!('Notification' in window)) {
      setPermission('unsupported');
      return;
    }

    if (
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission().then(status => {
        setPermission(status);
      });
    }
  }, []);

  return permission;
}
