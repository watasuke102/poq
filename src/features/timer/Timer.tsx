import {useTasks} from '../task/task_atom';
import * as stylex from '@stylexjs/stylex';
import {useTimer} from './timer_atom';

const style = stylex.create({
  timerStatusContainer: {
    margin: '0 8px',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr',
    gap: 12,
    fontSize: '2rem',
    minHeight: 32,
  },

  timerStatus: {
    fontWeight: 'bold',
  },
  timerCounter: {
    display: 'block',
    textAlign: 'center',
    fontSize: 'min(25dvw, 30dvh)',
    fontWeight: 'bold',
    fontFamily: 'Consolas, "Courier New", monospace',
  },
  buttonContainer: {
    display: 'flex',
    gap: 12,
    justifySelf: 'center',
  },
  button: {
    width: 72,
  },
});

interface Props {
  tasksApi: ReturnType<typeof useTasks>;
}

export function Timer(props: Props) {
  const {timerState, toggleStartStop, reset, skip} = useTimer(props.tasksApi);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };
  const currentTimerStatus = () => {
    if (timerState.mode === 'break') {
      return 'Break';
    }
    return timerState.currentTaskTitle ?? 'No Task';
  };

  return (
    <div>
      <div {...stylex.props(style.timerStatusContainer)}>
        <span>Current:</span>
        <span {...stylex.props(style.timerStatus)}>{currentTimerStatus()}</span>
      </div>
      <span {...stylex.props(style.timerCounter)}>
        {formatTime(timerState.timeLeft)}
      </span>
      <div {...stylex.props(style.buttonContainer)}>
        <button onClick={reset} {...stylex.props(style.button)}>
          Reset
        </button>
        <button onClick={toggleStartStop} {...stylex.props(style.button)}>
          {timerState.isRunning ? 'Stop' : 'Start'}
        </button>
        <button onClick={skip} {...stylex.props(style.button)}>
          Skip
        </button>
      </div>
    </div>
  );
}
