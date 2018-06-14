import _ from 'lodash';
import { UPDATE_FILTER, UPDATE_STATUS, UPDATE_SELECT_TRANSACTIONS, UPDATE_CURRENT_PAGE } from './types';
import { fetchTransactionByFilter, fetchTransactionsByPage } from './api';

export function changeFilter(transactionsFilter) {
  return dispatch => {
    dispatch(updateFilter(transactionsFilter));
    dispatch(updateStatus('all'));
    dispatch(fetchTransactionByFilter(transactionsFilter));
  }
}

export function updateFilter(transactionsFilter) {
  return {
    type: UPDATE_FILTER,
    transactionsFilter
  };
}

export function changeStatus(selectedTransactions, status) {
  return dispatch => {
    var _temp = [];
    var _newSelected = {};

    // Filter Selected Transactions with Status
    if (status === 'success') {
      _.filter(selectedTransactions, function(item) {
        if (item.txreceipt_status == 1) { // eslint-disable-line
          _temp.push(item);
        }
      });

      _newSelected = _.mapKeys(_temp, 'blockNumber');
      dispatch(updateSelectedTransactions(_newSelected));
    }

    if (status === 'failed') {
      _.filter(selectedTransactions, function(item) {
        if (item.txreceipt_status == 0) { // eslint-disable-line
          _temp.push(item);
        }
      });
      _newSelected = _.mapKeys(_temp, 'blockNumber');
      dispatch(updateSelectedTransactions(_newSelected));
    }

    if (status === 'all') {
      dispatch(updateSelectedTransactions(selectedTransactions));
    }

    dispatch(updateStatus(status));
    _temp = [];
    _newSelected = {};
  }
}

export function updateSelectedTransactions(transactions) {
  return {
    type: UPDATE_SELECT_TRANSACTIONS,
    transactions
  }
}

export function updateStatus(status) {
  return {
    type: UPDATE_STATUS,
    status
  }
}


export function updateCurrentPage(currentPage) {
  return {
    type: UPDATE_CURRENT_PAGE,
    currentPage
  };
}

export function fetchPage(page) {
  return dispatch => {
    dispatch(fetchTransactionsByPage(page));
    dispatch(updateCurrentPage(page));
  };
}
