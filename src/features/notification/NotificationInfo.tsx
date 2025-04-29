import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {useNotificationPermission} from './useNotificationPermission';
import {sendTestNotification} from './notify';

const styles = stylex.create({
  notificationInfo: {
    fontSize: '0.75rem',
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
  },
  icon: {
    width: 16,
    height: 16,
    display: 'inline-block',
  },
  button: {
    fontSize: '0.75rem',
    padding: '2px 6px',
    background: '#eee',
    border: '1px solid #ccc',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background 0.2s ease',
    ':hover': {
      background: '#ddd',
    },
  },
});

/**
 * Component that shows a notification permission suggestion message
 * when notifications are blocked or not supported
 */
export function NotificationInfo() {
  const [permission, setPermission] = useState(useNotificationPermission());

  const requestPermission = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then(status => {
        setPermission(status);
      });
    }
  };

  if (permission === 'denied') {
    return (
      <div {...stylex.props(styles.notificationInfo)}>
        <span role='img' aria-label='warning'>
          ⚠️
        </span>
        <span>
          Enable notifications in browser settings to receive task alerts
        </span>
      </div>
    );
  }

  if (permission === 'default') {
    return (
      <div {...stylex.props(styles.notificationInfo)}>
        <span role='img' aria-label='bell'>
          🔔
        </span>
        <button onClick={requestPermission} {...stylex.props(styles.button)}>
          Enable notifications
        </button>
      </div>
    );
  }

  if (permission === 'unsupported') {
    return (
      <div {...stylex.props(styles.notificationInfo)}>
        <span role='img' aria-label='information'>
          ℹ️
        </span>
        <span>Your browser doesn't support notifications</span>
      </div>
    );
  }

  if (permission === 'granted') {
    return (
      <div {...stylex.props(styles.notificationInfo)}>
        <span role='img' aria-label='check'>
          ✅
        </span>
        <span>Notifications enabled</span>
        <button onClick={sendTestNotification} {...stylex.props(styles.button)}>
          Test
        </button>
      </div>
    );
  }

  return null;
}
