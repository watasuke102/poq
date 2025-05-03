import * as stylex from '@stylexjs/stylex';
import {useTasks} from './task_atom';
import DeleteIcon from '../../assets/delete.svg';

const style = stylex.create({
  section: {
    margin: '0 8px',
    height: '100%',
    display: 'grid',
    gridTemplateRows: 'auto 1fr',
    overflowY: 'hidden',
  },
  scrollContainer: {
    overflowY: 'auto',
    scrollbarGutter: 'stable',
  },
  table: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: 'auto 1fr auto',
    alignItems: 'center',
    gap: 12,
  },
  tableHead: {
    width: '100%',
    height: '100%',
    fontWeight: 'bold',
    position: 'sticky',
    top: 0,
    backgroundColor: '#282c34dd',
    borderBottom: '2px solid #abb2bf',
  },
  deleteButton: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none !important',
    padding: '4px 8px',
  },
});

export function TaskList() {
  const {tasks, removeTask} = useTasks();
  return (
    <section {...stylex.props(style.section)}>
      <h2>Tasks</h2>
      <div {...stylex.props(style.scrollContainer)}>
        <div {...stylex.props(style.table)}>
          <div {...stylex.props(style.tableHead)}>Priority</div>
          <div {...stylex.props(style.tableHead)}>Title</div>
          <div {...stylex.props(style.tableHead)} />

          {tasks.map((e, i) => (
            <>
              <div key={`${i}_priority`}>{e.priority}</div>
              <div key={`${i}_title`}>{e.title}</div>
              <div key={`${i}_deleteButton`}>
                <button
                  onClick={() => removeTask(e)}
                  {...stylex.props(style.deleteButton)}
                >
                  <img src={DeleteIcon} />
                </button>
              </div>
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
