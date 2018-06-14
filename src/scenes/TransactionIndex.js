import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchTransactionByFilter } from '../actions/api';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import TypeFilters from '../containers/TypeFilters';
import TxTable from '../containers/TxTable';
import { Header } from '../components/Header';

class TransactionIndex extends Component {
  componentDidMount = () => {
    this.props.fetchTransactionByFilter();
  };

  renderViewAllCTA() {
    if (this.props.transactionsFilter === 'txlist') {
      return (
        <div className="result-hint">
          <span className="hint">
            Results for the first <strong>200</strong> transactions.
          </span>
          <Link className="btn-redirect" to="/paginated">
            View All
          </Link>
        </div>
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Header />
        <div>
          <TypeFilters />
          {this.renderViewAllCTA()}
          <TxTable />
        </div>
      </React.Fragment>
    );
  }
}
function mapStateToProps({ transactionsFilter }) {
  return { transactionsFilter };
}

TransactionIndex.propTypes = {
  fetchTransactionByFilter: PropTypes.func.isRequired,
  transactionsFilter: PropTypes.string.isRequired
};

export default connect(mapStateToProps, { fetchTransactionByFilter })(
  TransactionIndex
);
