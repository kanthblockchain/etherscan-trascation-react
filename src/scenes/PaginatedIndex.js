import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchTransactionsByPage } from '../actions/api';
import { Link } from 'react-router-dom';
import Pagination from '../containers/Pagination';
import TxTable from '../containers/TxTable';
import { IconBack } from '../components/svg';

class PaginatedIndex extends Component {
  componentDidMount = () => {
    this.props.fetchTransactionsByPage();
  };

  render() {
    return (
      <React.Fragment>
        <header>
          <Link
            style={{ margin: '0' }}
            className="btn btn-block"
            to="/transactions"
          >
            <IconBack />
            Go back to transactions
          </Link>
          <h1 style={{ fontSize: '16px', marginBottom: '0' }}>
            Token Contract -
            <span style={{ fontSize: '14px', color: '#844fff' }}>
              {' '}
              PolicyPal Network
            </span>
            <span
              style={{ fontSize: '13px', color: '#806ca5', paddingLeft: '5px' }}
            >
              0xfeDAE5642668f8636A11987Ff386bfd215F942EE
            </span>
          </h1>
        </header>
        <div>
          <div className="result-hint">
            <span className="hint">
              Results for page <strong>{this.props.currentPage}</strong> out of <strong>400</strong> pages.
            </span>
          </div>
          <TxTable />
          <Pagination />
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps({ currentPage }) {
  return { currentPage };
}
PaginatedIndex.propTypes = {
  fetchTransactionsByPage: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired
};

export default connect(mapStateToProps, { fetchTransactionsByPage })(
  PaginatedIndex
);
