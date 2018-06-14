import { UPDATE_CURRENT_PAGE } from '../actions/types';

export function currentPage(state = 1, action) {
  switch (action.type) {
    case UPDATE_CURRENT_PAGE:
      return action.currentPage;
    default:
      return state;
  }
}