import {Timer} from './features/timer';
import {NotificationInfo} from './features/notification';
import * as stylex from '@stylexjs/stylex';
import {AddNewTaskArea, TaskList, useTasks} from './features/task';

const style = stylex.create({
  app: {
    display: 'grid',
    minHeight: '100vh',
    gridTemplateRows: 'auto auto 1fr auto',
  },
});

export function App() {
  const tasksApi = useTasks();

  return (
    <main {...stylex.props(style.app)}>
      <Timer tasksApi={tasksApi} />
      <AddNewTaskArea />
      <TaskList />
      <NotificationInfo />
    </main>
  );
}
