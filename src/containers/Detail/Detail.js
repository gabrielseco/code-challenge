// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import type { Match } from 'react-router-dom';
import { State } from './../../reducers';
import { getArticle } from './../../actions';
import type { Article as IArticle } from './../../types';

import './Detail.css';

type DefaultProps = {
  article: IArticle
};

type Props = {
  article: IArticle,
  dispatch: Dispatch<*>,
  match: Match
};

class Detail extends Component<DefaultProps, Props, void> {
  constructor() {
    super();
    this.renderTags = this.renderTags.bind(this);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getArticle(this.props.match.params.id));
  }

  renderTags() {
    if (this.props.article.tags !== undefined) {
      return this.props.article.tags.map(tag =>
        <p className="text-center" key={tag}>
          {tag}
        </p>
      );
    }
    return null;
  }

  // Renders
  render() {
    return (
      <div className="detail">
        <h2 className="title text-center">
          {this.props.article.title}
        </h2>
        <p className="author text-center">
          {this.props.article.author}
        </p>
        <p className="content text-center">
          {this.props.article.content}
        </p>
        <p className="pubished text-center">
          {this.props.article.published ? 'SÍ' : 'NO'}
        </p>
        {this.renderTags()}
      </div>
    );
  }
}

Detail.defaultProps = {
  article: {
    title: '',
    author: '',
    content: '',
    published: false,
    tags: [],
  },
};

const mapStateToProps = (state: State) => ({
  article: state.article.article[0],
});

export default connect(mapStateToProps)(Detail);
