import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import EllipsisText from 'react-ellipsis-text';
import Timestamp from 'react-timestamp';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../style/components/table.css';
import { IconView } from '../components/svg';

class TxRows extends Component {
  mapTransactions(transactions) {
    return _.map(transactions, transaction => {
      let status;

      if (transaction.txreceipt_status == 1) { // eslint-disable-line
        status = (
          <span className="table-col--content status success">Success</span>
        );
      } else {
        status = (
          <span className="table-col--content status failed">Failed</span>
        );
      }

      return (
        <div className="table-row" key={transaction.blockNumber}>
          <div className="table-col">
            <span className="table-col--label">Hash</span>
            <span className="table-col--content hash">
              <EllipsisText text={transaction.hash} length={30} />
            </span>
          </div>
          <div className="table-col">
            <span className="table-col--label">Status</span>
            {status}
          </div>

          <div className="table-col">
            <span className="table-col--label">From</span>
            <span className="table-col--content from">
              <EllipsisText text={transaction.from} length={25} />
            </span>
          </div>
          <div className="table-col">
            <span className="table-col--label">To</span>
            <span className="table-col--content to">
              <EllipsisText text={transaction.to} length={25} />
            </span>
          </div>
          <div className="table-col">
            <span className="table-col--label">Age</span>
            <span className="table-col--content age">
            <Timestamp time={transaction.timeStamp} actualSeconds precision={2} autoUpdate={60}/>

            </span>
          </div>
          <div className="table-col">
            <span className="table-col--label">Detail</span>
            <span className="table-col--content detail">
              <Link to={`/transaction/${transaction.blockNumber}`}>
                View <IconView />
              </Link>
            </span>
          </div>
        </div>
      );
    });
  }

  renderTransactionRows() {
    if (
      this.props.transactionsStatus === 'success' ||
      this.props.transactionsStatus === 'failed'
    ) {
      return this.mapTransactions(this.props.selectedTransactionsByStatus);
    }

    if (this.props.transactionsStatus === 'all') {
      return this.mapTransactions(this.props.selectedTransactions);
    }
  }

  render() {
    return <div className="table-body">{this.renderTransactionRows()}</div>;
  }
}

function mapStateToProps({
  selectedTransactions,
  selectedTransactionsByStatus,
  transactionsStatus
}) {
  return {
    selectedTransactions,
    selectedTransactionsByStatus,
    transactionsStatus
  };
}

TxRows.propTypes = {
  selectedTransactions: PropTypes.object.isRequired,
  selectedTransactionsByStatus: PropTypes.object.isRequired,
  transactionsStatus: PropTypes.string.isRequired
};

export default connect(mapStateToProps)(TxRows);
