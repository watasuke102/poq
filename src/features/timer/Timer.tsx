import {useState, useEffect} from 'react';
import * as stylex from '@stylexjs/stylex';

const style = stylex.create({
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
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
}
export function Timer(props: Props) {
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

  useEffect(() => {
    let timer: number | null = null;

    if (props.isRunning) {
      timer = setInterval(() => {
        setTimeLeft(prevTime => Math.max(prevTime - 1, 0));
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [props.isRunning]);

  const handleStartStop = () => {
    props.setIsRunning(prev => !prev);
  };

  const handleReset = () => {
    props.setIsRunning(false);
    setTimeLeft(30 * 60);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0',
    )}`;
  };

  return (
    <div>
      <span {...stylex.props(style.timerCounter)}>{formatTime(timeLeft)}</span>
      <div {...stylex.props(style.buttonContainer)}>
        <button onClick={handleReset} {...stylex.props(style.button)}>
          Reset
        </button>
        <button onClick={handleStartStop} {...stylex.props(style.button)}>
          {props.isRunning ? 'Stop' : 'Start'}
        </button>
      </div>
    </div>
  );
}
