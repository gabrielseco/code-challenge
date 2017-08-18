import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormArticle } from './../FormArticle';
import { editArticle, getArticleEdition } from './../../actions';

class EditArticle extends Component {
  // definition
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { dispatch } = this.props;

    dispatch(getArticleEdition(this.props.match.params.id));
  }

  componentWillUpdate(nextProps) {
    if (nextProps.articleMutation) {
      nextProps.history.push('/');
    }
  }

  onSubmit(event) {
    const { dispatch } = this.props;
    dispatch(editArticle(event));
  }

  render() {
    return (
      <FormArticle
        article={this.props.article}
        onSubmit={event => this.onSubmit(event)}
        edit
      />
    );
  }
}

const mapStateToProps = state => ({
  article: state.article.article,
  articleMutation: state.article.articleMutation,
});

EditArticle.propTypes = {
  article: PropTypes.object,
  dispatch: PropTypes.func,
  match: PropTypes.object,
};

export { EditArticle as EditArticleTesting, mapStateToProps };

export default connect(mapStateToProps)(EditArticle);
