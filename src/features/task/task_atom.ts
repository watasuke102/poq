import {useAtom} from 'jotai';
import {atomWithStorage} from 'jotai/utils';
import React from 'react';

export type NewTaskInfo = {
  title: string;
  /// lower is more urgent
  priority: 0 | 1 | 2 | 3;
};
type Task = {
  createdAt: Date; // expected to be unique
  done: boolean;
  executed: boolean;
} & NewTaskInfo;

const tasksAtom = atomWithStorage<Task[]>('tasks', []);
export function useTasks() {
  const [tasks, setTasks] = useAtom(tasksAtom);

  const addTask = (task: NewTaskInfo) => {
    const newTask: Task = {
      ...task,
      createdAt: new Date(),
      done: false,
      executed: false, // initialize as not executed
    };
    const newTasks = tasks.concat([newTask]);
    // higher (bigger) priority first
    newTasks.sort((a, b) => b.priority - a.priority);
    setTasks(newTasks);
  };

  const removeTask = (task: Task) => {
    setTasks(tasks.filter(t => t.createdAt !== task.createdAt));
  };

  const markTaskExecuted = (task: Task) => {
    setTasks(tasks =>
      tasks.map(t =>
        t.createdAt === task.createdAt ? {...t, executed: true} : t,
      ),
    );
  };
  // wrap useCallback because it's used by getNextTask()
  const resetExecuted = React.useCallback(() => {
    setTasks(tasks => tasks.map(t => ({...t, executed: false})));
  }, [setTasks]);
  const getNextTask = React.useCallback(() => {
    if (tasks.every(t => t.executed)) {
      resetExecuted();
      return tasks[0] || null;
    }
    // tasks are expected to be sorted by priority
    return tasks.filter(t => !t.executed)[0] || null;
  }, [tasks, resetExecuted]);

  return {
    tasks,
    addTask,
    removeTask,
    markTaskExecuted,
    resetExecuted,
    getNextTask,
  };
}
