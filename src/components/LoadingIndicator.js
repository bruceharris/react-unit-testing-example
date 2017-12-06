import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class LoadingIndicator extends Component {
  static propTypes = {
    isLoading: PropTypes.bool.isRequired,
  };

  render() {
    if (this.props.isLoading) {
      return null;
    }
    return this.props.children;
  }
}
