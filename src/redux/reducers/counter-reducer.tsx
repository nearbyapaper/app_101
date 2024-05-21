// reducer.ts
import {INCREMENT, DECREMENT} from '../types/counter-type';
import {CounterActionTypes} from '../actions/counter-action';

interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

export const counterReducer = (
  state = initialState,
  action: CounterActionTypes,
): CounterState => {
  switch (action.type) {
    case INCREMENT:
      return {
        ...state,
        count: state.count + 1,
      };
    case DECREMENT:
      return {
        ...state,
        count: state.count - 1,
      };
    default:
      return state;
  }
};
