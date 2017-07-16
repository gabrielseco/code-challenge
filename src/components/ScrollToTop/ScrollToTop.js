// @flow
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  props: {
    location: any,
    children: React.ReactChildren
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
