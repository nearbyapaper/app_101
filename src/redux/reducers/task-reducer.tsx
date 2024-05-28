import {Task, TaskActionTypes} from '../actions/task-action';
import {ADD_TASK, UPDATE_TASK} from '../types/task-type';

export interface TaskState {
  taskList: Task[];
}

const initialState: TaskState = {
  taskList: [],
};

export const taskReducer = (
  state = initialState,
  action: TaskActionTypes,
): TaskState => {
  switch (action.type) {
    case ADD_TASK:
      return {
        ...state,
        taskList: [...state.taskList, action.payload],
      };
    case UPDATE_TASK:
      return {
        ...state,
        taskList: action.payload.map(task => ({...task})),
      };
    default:
      return state;
  }
};
