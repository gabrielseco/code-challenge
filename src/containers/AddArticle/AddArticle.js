import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormArticle } from './../FormArticle';
import { addArticle } from './../../actions';

class AddArticle extends Component {
  // definition
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillUpdate(nextProps) {
    if (nextProps.articleMutation) {
      nextProps.history.push('/');
    }
  }

  onSubmit(event) {
    const { dispatch } = this.props;
    dispatch(addArticle(event));
  }

  render() {
    return (
      <FormArticle onSubmit={event => this.onSubmit(event)} />
    );
  }
}

const mapStateToProps = state => ({
  articleMutation: state.article.articleMutation,
});

AddArticle.propTypes = {
  dispatch: PropTypes.func,
};

export { AddArticle as AddArticleTesting };

export default connect(mapStateToProps)(AddArticle);
