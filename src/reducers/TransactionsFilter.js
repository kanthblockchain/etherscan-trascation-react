import { UPDATE_FILTER } from '../actions/types';

export function transactionsFilter(state = 'txlist', action) {
  switch (action.type) {
    case UPDATE_FILTER:
      return action.transactionsFilter;
    default:
      return state;
  }
}