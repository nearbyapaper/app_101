import {UPDATE, ADD} from '../types/dialy-type';

interface Mission {
  name: string;
  isDone: boolean;
  index: number;
}

export interface UpdateDailyAction {
  action: Mission;
  payload: Mission[];
  type: typeof UPDATE;
}
export interface AddDailyAction {
  payload: Mission;
  type: typeof ADD;
}

export type DailyActionTypes = UpdateDailyAction | AddDailyAction;

export const updateDaily = (missions: Mission[]): UpdateDailyAction => ({
  type: UPDATE,
  payload: missions,
});

export const addDaily = (mission: Mission): AddDailyAction => ({
  type: ADD,
  payload: mission,
});
