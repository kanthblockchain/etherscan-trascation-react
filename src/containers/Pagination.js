import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchPage } from '../actions';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import '../style/components/pagination.css';

class Pagination extends Component {
  handlePageClick = data => {
    let selected = data.selected + 1;
    this.props.fetchPage(selected);
  };

  render() {
    return (
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={400}
        marginPagesDisplayed={2}
        pageRangeDisplayed={2}
        onPageChange={this.handlePageClick}
        containerClassName={'pagination'}
        activeClassName={'active'}
      />
    );
  }
}

Pagination.propTypes = {
  fetchPage: PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchPage }, dispatch);
}

export default connect(null, mapDispatchToProps)(Pagination);
