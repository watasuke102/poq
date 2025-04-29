import React from 'react';
import {useAtom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';
import {useTasks} from '../task';
import {notify} from '../notification';

const WORK_DURATION_SEC = 30 * 60; // 30 minutes
const BREAK_DURATION_SEC = 5 * 60; // 5 minutes

export type TimerState = {
  isRunning: boolean;
  currentTaskTitle: string | null;
  mode: 'none' | 'work' | 'break';
  timeLeft: number;
};

const timerAtom = atomWithStorage<TimerState>('timer', {
  isRunning: false,
  currentTaskTitle: null,
  mode: 'none',
  timeLeft: WORK_DURATION_SEC,
});

export function useTimer(tasksApi: ReturnType<typeof useTasks>) {
  const [timerState, setTimerState] = useAtom(timerAtom);

  // tick every 1sec
  React.useEffect(() => {
    let timer: number | null = null;
    if (!timerState.isRunning) {
      return () => {};
    }
    timer = setInterval(() => {
      setTimerState(prev => {
        if (prev.timeLeft > 0)
          return {
            ...prev,
            timeLeft: prev.timeLeft - 1,
          };
        // Timer reached 0
        switch (prev.mode) {
          case 'work':
            notify('Task Completed!', {
              body: prev.currentTaskTitle
                ? `"${prev.currentTaskTitle}" completed. Time for a break!`
                : 'Your work session has ended. Time for a break!',
              icon: '/favicon.ico',
            });
            return {
              ...prev,
              mode: 'break',
              timeLeft: BREAK_DURATION_SEC, // break
            };
          case 'break':
            notify('Break time is over', {
              body: 'Break time is over. Ready for the next task!',
              icon: '/favicon.ico',
            });
            return {
              ...prev,
              mode: 'none',
              isRunning: false, // stop after break
              currentTaskTitle: null,
              timeLeft: WORK_DURATION_SEC,
            };
          default:
            return prev; // unreachable (no action)
        }
      });
    }, 1000);
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [setTimerState, timerState.isRunning]);

  const reset = () => {
    setTimerState({
      isRunning: false,
      currentTaskTitle: null,
      mode: 'none',
      timeLeft: WORK_DURATION_SEC,
    });
    tasksApi.resetExecuted();
  };

  const toggleStartStop = () => {
    // Request notification permissions when starting the timer
    if (
      !timerState.isRunning &&
      'Notification' in window &&
      Notification.permission !== 'granted' &&
      Notification.permission !== 'denied'
    ) {
      Notification.requestPermission();
    }

    setTimerState(prev => {
      const next = JSON.parse(JSON.stringify(prev));
      if (prev.mode === 'none') {
        next.mode = 'work';
        next.timeLeft = WORK_DURATION_SEC;
        const nextTask = tasksApi.getNextTask();
        if (nextTask) {
          next.currentTaskTitle = nextTask.title;
          tasksApi.markTaskExecuted(nextTask);
        } else {
          console.error('No task to execute');
          next.currentTaskTitle = null;
        }
      }

      next.isRunning = !prev.isRunning;
      return next;
    });
  };

  return {
    timerState,
    toggleStartStop,
    reset,
  };
}
