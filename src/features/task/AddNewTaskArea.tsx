import React from 'react';
import {NewTaskInfo, useTasks} from './task_atom';
import * as stylex from '@stylexjs/stylex';

const style = stylex.create({
  section: {
    margin: '0 4px',
  },
  form: {
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    gap: 8,
  },
});

export function AddNewTaskArea() {
  const {addTask} = useTasks();
  const [title, setTitle] = React.useState<NewTaskInfo['title']>('');
  const [priority, setPriority] = React.useState<NewTaskInfo['priority']>(0);

  const handleButtonClicked = React.useCallback(() => {
    if (title === '') {
      return;
    }
    addTask({title, priority});
    setTitle('');
    setPriority(0);
  }, [addTask, title, priority]);

  return (
    <section {...stylex.props(style.section)}>
      <h2>Add new task</h2>
      <div {...stylex.props(style.form)}>
        <input
          type='number'
          value={priority}
          onChange={e => {
            const input = Number(e.target.value);
            // shut tsc up
            if (input === 0 || input === 1 || input === 2 || input === 3) {
              setPriority(input);
            }
          }}
          min={0}
          max={3}
        />
        <input
          type='text'
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button onClick={handleButtonClicked}>Add</button>
      </div>
    </section>
  );
}
