import {INCREMENT, DECREMENT} from '../types/counter-type';

export interface IncrementAction {
  type: typeof INCREMENT;
}

export interface DecrementAction {
  type: typeof DECREMENT;
}

export type CounterActionTypes = IncrementAction | DecrementAction;

export const increment = (): IncrementAction => ({
  type: INCREMENT,
});

export const decrement = (): DecrementAction => ({
  type: DECREMENT,
});
