import _ from 'lodash';
import {
  TRANSACTIONS_HAVE_ERROR,
  TRANSACTIONS_LOADING,
  FETCH_TRANSACTIONS_SUCCESS,
  SELECT_TRANSACTIONS,
  UPDATE_SELECT_TRANSACTIONS
} from '../actions/types';

export function transactions(state = {}, action) {
  switch (action.type) {
    case FETCH_TRANSACTIONS_SUCCESS:
      return Object.assign({}, state, action.transactions);
    default:
      return state;
  }
}

export function selectedTransactions(state = {}, action) {
  switch (action.type) {
    case SELECT_TRANSACTIONS:
      return _.mapKeys(action.transactions, 'blockNumber');
    default:
      return state;
  }
}

export function selectedTransactionsByStatus(state = {}, action) {
  switch (action.type) {
    case UPDATE_SELECT_TRANSACTIONS:
      return action.transactions;
    default:
      return state;
  }
}

export function transactionsHaveError(state = false, action) {
  switch (action.type) {
    case TRANSACTIONS_HAVE_ERROR:
      return action.hasError;
    default:
      return state;
  }
}

export function transactionsLoading(state = false, action) {
  switch (action.type) {
    case TRANSACTIONS_LOADING:
      return action.isLoading;
    default:
      return state;
  }
}
