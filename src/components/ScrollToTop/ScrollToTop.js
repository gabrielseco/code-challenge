// @flow
import { Component } from 'react';
import type { Children } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  props: {
    location: any,
    children: Children
  }

  render() {
    return this.props.children;
  }
}

export default withRouter(ScrollToTop);
