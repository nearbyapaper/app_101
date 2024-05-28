import {ADD_TASK, UPDATE_TASK} from '../types/task-type';

export interface Task {
  id: string;
  name: string;
  type: string;
  status: string;
  detail: string;
  targetDate: string;
  createdDate?: string;
}

export interface AddTaskAction {
  payload: Task;
  type: typeof ADD_TASK;
}

export interface UpdateTaskAction {
  payload: Task[];
  type: typeof UPDATE_TASK;
}

export type TaskActionTypes = AddTaskAction | UpdateTaskAction;

export const addTask = (task: Task): AddTaskAction => ({
  type: ADD_TASK,
  payload: task,
});

export const updateTask = (taskList: Task[]): UpdateTaskAction => ({
  type: UPDATE_TASK,
  payload: taskList,
});
