import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeFilter, changeStatus } from '../actions';
import { IconChevronDown } from '../components/svg';
import PropTypes from 'prop-types';
import '../style/components/filter.css';

class TypeFilters extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'all',
      type: 'txlist'
    };

    this.handleTypeFilterSelect = this.handleTypeFilterSelect.bind(this);
    this.handleStatusFilterSelect = this.handleStatusFilterSelect.bind(this);
  }

  handleTypeFilterSelect(event) {
    event.preventDefault();
    this.setState({ type: event.target.value, status: event.target.value });
    this.props.changeFilter(event.target.value);
  }

  handleStatusFilterSelect(event) {
    event.preventDefault();
    this.setState({ status: event.target.value });
    this.props.changeStatus(
      this.props.selectedTransactions,
      event.target.value
    );
  }

  render() {
    return (
      <div className="filter-container">
        <div className="filter-group">
          <span className="filter-label">Transaction Types</span>
          <div className="select-custom select-custom_l">
            <select
              value={this.state.type}
              onChange={this.handleTypeFilterSelect}
            >
              <option value="txlist">Normal Transactions</option>
              <option value="txlistinternal">Internal Transactions</option>
              <option value="tokentx">Token Transfers</option>
            </select>
            <IconChevronDown />
          </div>
        </div>
        {this.state.type === 'txlist' && (
          <div className="filter-group">
            <span className="filter-label">Status</span>
            <div className="select-custom">
              <select
                value={this.state.status}
                onChange={this.handleStatusFilterSelect}
              >
                <option value="all">All</option>
                <option value="success">Success</option>
                <option value="failed">failed</option>
              </select>
              <IconChevronDown />
            </div>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ selectedTransactions, transactionsFilter }) {
  return { selectedTransactions, transactionsFilter };
}

TypeFilters.propTypes = {
  selectedTransactions: PropTypes.object.isRequired,
  transactionsFilter: PropTypes.string.isRequired,
  changeFilter: PropTypes.func.isRequired,
  changeStatus: PropTypes.func.isRequired
};

export default connect(mapStateToProps, { changeFilter, changeStatus })(
  TypeFilters
);
