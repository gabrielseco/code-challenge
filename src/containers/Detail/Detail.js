// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { State } from './../../reducers';
import { getArticle } from './../../actions';
import { Article as IArticle } from './../../types';

import './Detail.css';

class Detail extends Component {

  constructor() {
    super();
    this.renderTags = this.renderTags.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getArticle(this.props.match.params.id));
  }

  props: {
    article: IArticle,
    dispatch: any,
    match: any
  };

  renderTags() {
    if (this.props.article.tags !== undefined) {
      return this.props.article.tags.map(tag => <p key={tag}>{tag}</p>);
    }
    return null;
  }

  // Renders
  render() {
    return (
      <div className="detail">
        <h2 className="title">
          {this.props.article.title}
        </h2>
        <p className="author">{this.props.article.author}</p>
        <p className="content">{this.props.article.content}</p>
        <p className="pubished">{this.props.article.published ? 'SÍ' : 'NO'}</p>
        {this.renderTags()}
      </div>
    );
  }
}

Detail.defaultProps = {
  article: [],
};

const mapStateToProps = (state: State) => ({
  article: state.article.article[0],
});

export default connect(mapStateToProps)(Detail);
