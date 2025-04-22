import React from 'react';
import {Timer} from './features/Timer';
import * as stylex from '@stylexjs/stylex';
import {AddNewTaskArea, TaskList} from './features/task';

const style = stylex.create({
  app: {
    display: 'grid',
    minHeight: '100vh',
    gridTemplateRows: 'auto auto 1fr',
  },
});

export function App() {
  const [isTimerRunning, setIsTimerRunning] = React.useState(false);
  return (
    <main {...stylex.props(style.app)}>
      <Timer isRunning={isTimerRunning} setIsRunning={setIsTimerRunning} />
      <AddNewTaskArea />
      <TaskList />
    </main>
  );
}
