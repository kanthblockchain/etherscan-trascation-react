import React, { Component } from 'react';
import Timestamp from 'react-timestamp';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchDetail } from '../actions/api';
import '../style/components/detail.css';
import { IconBack } from './svg';

class Detail extends Component {
  componentDidMount() {
    this.props.fetchDetail(this.props.transactionsFilter);
  }

  renderStatue() {
    if (this.props.transaction.txreceipt_status == 1) { // eslint-disable-line
      return (
        <div className="detail-row">
          <span className="detail-col-title">Status</span>
          <span className="detail-col-content status success">Success</span>
        </div>
      );
    } else {
      return (
        <div className="detail-row">
          <span className="detail-col-title">Status</span>
          <span className="detail-col-content status failed">failed</span>
        </div>
      );
    }
  }

  renderTokenTransfer() {
    if (this.props.transaction.tokenDecimal) {
      return (
        <div className="detail-row">
          <span className="detail-col-title">Token Transfer</span>
          <span className="detail-col-content">
            <span>{this.props.transaction.tokenDecimal}</span>
            <span className="token-name">{this.props.transaction.tokenName}</span>
          </span>
        </div>
      );
    }
  }
  render() {
    const { transaction } = this.props;

    if (!transaction) {
      return <div>Loading...</div>;
    }

    return (
      <React.Fragment>
        <Link className="btn btn-block" to="/transactions">
          <IconBack />
          Go back to transactions
        </Link>
        <div className="detail-container">
          <div className="detail-header">
            <h1>Transaction Detail</h1>
          </div>
          <div className="detail-body">
            <div className="detail-row">
              <span className="detail-col-title">TxHash</span>
              <span className="detail-col-content">{transaction.hash}</span>
            </div>
            {this.renderStatue()}
            <div className="detail-row">
              <span className="detail-col-title">Block Height</span>
              <span className="detail-col-content">
                {transaction.confirmations}
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-col-title">TimeStamp</span>
              <span className="detail-col-content">
                <Timestamp
                  time={transaction.timeStamp}
                  precision={3}
                  autoUpdate={60}
									actualSeconds
                />
              </span>
            </div>
            <div className="detail-row">
              <span className="detail-col-title">From</span>
              <span className="detail-col-content">{transaction.from}</span>
            </div>
            <div className="detail-row">
              <span className="detail-col-title">To</span>
              <span className="detail-col-content">{transaction.to}</span>
            </div>
            {this.renderTokenTransfer()}
            <div className="detail-row">
              <span className="detail-col-title">Value</span>
              <span className="detail-col-content">{transaction.value}</span>
            </div>
            <div className="detail-row">
              <span className="detail-col-title">Gas Limit</span>
              <span className="detail-col-content">{transaction.gas}</span>
            </div>
            <div className="detail-row">
              <span className="detail-col-title">Gas Used By Txn</span>
              <span className="detail-col-content">{transaction.gasUsed}</span>
            </div>
            <div className="detail-row">
              <span className="detail-col-title">Gas Price</span>
              <span className="detail-col-content">{transaction.gasPrice}</span>
            </div>
            <div className="detail-row">
              <span className="detail-col-title">Nonce</span>
              <span className="detail-col-content">{transaction.nonce}</span>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

function mapStateToProps(
  { selectedTransactions, transactionsFilter },
  ownProps
) {
  return {
    transaction: selectedTransactions[ownProps.match.params.blockNumber],
    transactionsFilter
  };
}

Detail.propTypes = {
  selectedTransactions: PropTypes.object.isRequired,
  transactionsFilter: PropTypes.string.isRequired,
  fetchDetail: PropTypes.func.isRequired,
  transaction: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { fetchDetail })(Detail);
