import fetch from 'cross-fetch';
import {
  TRANSACTIONS_HAVE_ERROR,
  TRANSACTIONS_LOADING,
  FETCH_TRANSACTIONS_SUCCESS,
  SELECT_TRANSACTIONS
} from './types';

const API_KEY = '5R64NN2GK66TRIGZPR5YHFGFQ7SU7NDS7W';
const ROOT_URL = `https://api.etherscan.io/api?module=account&address=0xfeDAE5642668f8636A11987Ff386bfd215F942EE&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}`;

export function fetchTransactionByFilter(filter = 'txlist') {
  let url = `${ROOT_URL}&page=1&offset=200&action=${filter}`;

  return dispatch => {
    dispatch(transactionsLoading(true));
    fetch(url)
      .then(res => {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }
        return res.json();
      })
      .then(resp => {
        dispatch(fetchTransactionSuccess(resp.result));
        dispatch(updateSelectedTransactions(resp.result));
        dispatch(transactionsLoading(false));
      })
      .catch(() => {
        dispatch(transactionsHaveError(true));
      });
  };
}

export function fetchTransactionsByPage(page = 1) {
  let url = `${ROOT_URL}&page=${page}&offset=10&action=txlist`;

  return dispatch => {
    dispatch(transactionsLoading(true));
    fetch(url)
      .then(res => {
        if (res.status >= 400) {
          throw new Error('Bad response from server');
        }
        return res.json();
      })
      .then(resp => {
        dispatch(fetchTransactionSuccess(resp.result));
        dispatch(updateSelectedTransactions(resp.result));
        dispatch(transactionsLoading(false));
      })
      .catch(() => {
        dispatch(transactionsHaveError(true));
      });
  };
}

export function updateSelectedTransactions(transactions) {
  return {
    type: SELECT_TRANSACTIONS,
    transactions
  };
}

export function fetchTransactionSuccess(transactions) {
  return {
    type: FETCH_TRANSACTIONS_SUCCESS,
    transactions
  };
}

export function transactionsHaveError(bool) {
  return {
    type: TRANSACTIONS_HAVE_ERROR,
    hasError: bool
  };
}

export function transactionsLoading(bool) {
  return {
    type: TRANSACTIONS_LOADING,
    isLoading: bool
  };
}

export function fetchDetail(filter) {
  return (dispatch) => {
    dispatch(fetchTransactionByFilter(filter));
  };
}

// export function fetchTransaction(page = 1, type = 'txlist') {
//   let url = `https://api.etherscan.io/api?module=account&address=0xfeDAE5642668f8636A11987Ff386bfd215F942EE&startblock=0&endblock=99999999&sort=asc&apikey=${API_KEY}&action=${type}&page=${page}&offset=10`;

//   return dispatch => {
//     dispatch(transactionsLoading(true));
//     fetch(url)
//       .then(res => {
//         if (res.status >= 400) {
//           throw new Error("Bad response from server");
//         }
//         return res.json();
//       })
//       .then(resp => {
//         dispatch(fetchTransactionSuccess(resp.result));
//         dispatch(transactionsLoading(false));
//       })
//       .catch(() => {
//         dispatch(transactionsHaveError(true));
//       });
//   };
// }
