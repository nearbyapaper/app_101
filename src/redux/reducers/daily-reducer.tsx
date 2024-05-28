import {DailyActionTypes} from '../actions/dialy-action';
import {ADD, UPDATE} from '../types/dialy-type';
export interface Mission {
  name: string;
  isDone: boolean;
  index: number;
}
export interface DailyMissionState {
  missionList: Mission[];
}

const initialState: DailyMissionState = {
  missionList: [],
};

export const dailyMissionReducer = (
  state = initialState,
  action: DailyActionTypes,
): DailyMissionState => {
  switch (action.type) {
    case ADD:
      return {
        ...state,
        missionList: [...state.missionList, action.payload],
      };
    case UPDATE:
      return {
        ...state,
        missionList: action.payload.map(mission => ({...mission})),
      };
    default:
      return state;
  }
};
