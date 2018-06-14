import { combineReducers } from 'redux';
import {
  transactionsHaveError,
  transactionsLoading,
  transactions,
  selectedTransactions,
  selectedTransactionsByStatus
} from './TransactionsReducer';
import { currentPage } from './CurrentPageReducer';
import { transactionsFilter } from './TransactionsFilter';
import { transactionsStatus } from './TransactionsStatus';

export default combineReducers({
  transactionsHaveError,
  transactionsLoading,
  transactions,
  transactionsFilter,
  selectedTransactions,
  selectedTransactionsByStatus,
  transactionsStatus,
  currentPage
});
