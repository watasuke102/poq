import {useState} from 'react';
import * as stylex from '@stylexjs/stylex';
import {useNotificationPermission} from './useNotificationPermission';

const styles = stylex.create({
  notificationInfo: {
    fontSize: '0.85rem',
    textAlign: 'right',
    margin: 8,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 8,
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
        <button
          onClick={() =>
            window.Notification?.requestPermission().then(status => {
              setPermission(status);
            })
          }
          {...stylex.props(styles.button)}
        >
          Enable notifications
        </button>
      </div>
    );
  }

  return <></>;
}
