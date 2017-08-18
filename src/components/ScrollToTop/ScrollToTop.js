import { Component } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.object.isRequired,
  location: PropTypes.object,
};

export { ScrollToTop as ScrollToTopTesting };

export default withRouter(ScrollToTop);
