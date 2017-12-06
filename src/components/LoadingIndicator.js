import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoadingIndicator extends Component {
  render() {
    return this.props.children;
  }
}

LoadingIndicator.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};
