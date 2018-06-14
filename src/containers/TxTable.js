import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import '../style/components/table.css';
import TxRows from './TxRows';

class TxTable extends Component {
  renderTransactions() {
    if (this.props.isLoading) {
      return (
        <div className="table-row">
          Loading...
        </div>
      );
    } else {
      return <TxRows />;
    }
  }
  render() {
    return (
      <div className="table">
        <div className="table-head">
          <div className="table-row">
            <div className="table-col-heading">Hash</div>
            <div className="table-col-heading">Status</div>
            <div className="table-col-heading">From</div>
            <div className="table-col-heading">To</div>
            <div className="table-col-heading">Age</div>
            <div className="table-col-heading">Detail</div>
          </div>
        </div>
        {this.renderTransactions()}
      </div>
    );
  }
}

function mapStateToProps({ transactionsLoading }) {
  return { isLoading: transactionsLoading };
}

TxTable.propTypes = {
  isLoading: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(TxTable);
