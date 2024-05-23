import {DailyActionTypes} from '../actions/dialy-action';
import {ADD, UPDATE} from '../types/dialy-type';

interface Mission {
  name: string;
  isDone: boolean;
  index: number;
}

// interface DailyMissionState {
//   missions: Mission[];
// }

// const initialState: DailyMissionState = {
//   missions: [],
// };

// export const dailyMissionReducer = (
//   state = initialState,
//   action: DailyActionTypes,
// ): DailyMissionState => {
//   switch (action.type) {
//     case ADD:
//       return {
//         ...state,
//         missions: [...state.missions, action.payload],
//       };
//     case UPDATE:
//       return {
//         ...state,
//         missions: [...action.payload],
//       };
//     default:
//       return state;
//   }
// };

interface DailyMissionState {
  missionList: Mission[];
}

const initialState: DailyMissionState = {
  missionList: [],
};

console.log('dailyMissionReducer initialState', initialState);

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
        missionList: [...action.payload],
      };
    default:
      return state;
  }
};
