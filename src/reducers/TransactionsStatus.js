import { UPDATE_STATUS } from '../actions/types';

export function transactionsStatus(state = 'all', action) {
	switch (action.type) {
		case UPDATE_STATUS:
			return action.status;
		default:
			return state;
	}
}
