import {useAtom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';

export type NewTaskInfo = {
  title: string;
  /// lower is more urgent
  priority: 0 | 1 | 2 | 3;
};
type Task = {
  createdAt: Date; // expected to be unique
  done: boolean;
} & NewTaskInfo;

const tasksAtom = atomWithStorage<Task[]>('tasks', []);
export function useTasks() {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const addTask = (task: NewTaskInfo) => {
    const newTask: Task = {
      ...task,
      createdAt: new Date(),
      done: false,
    };
    const newTasks = tasks.concat([newTask]);
    // higher (bigger) priority first
    newTasks.sort((a, b) => b.priority - a.priority);
    setTasks(newTasks);
  };

  const removeTask = (task: Task) => {
    setTasks(tasks.filter(t => t.createdAt !== task.createdAt));
  };

  return {
    tasks,
    addTask,
    removeTask,
  };
}
