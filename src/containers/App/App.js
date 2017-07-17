// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Article } from './../../components';
import type { Article as IArticle } from './../../types';
import { getArticles } from './../../actions';
import { State } from './../../reducers';
import './App.css';

class App extends Component {
  // definition
  constructor(props) {
    super(props);
    this.renderArticles = this.renderArticles.bind(this);
  }

  // lifecycle
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getArticles());
  }

  props: {
    dispatch: any,
    articles: IArticle[]
  };

  renderArticles() {
    return this.props.articles.map((article: IArticle) =>
      <Article key={article.id} data={article} />,
    );
  }

  // Renders
  render() {
    return (
      <div className="articles">
        {this.renderArticles()}
      </div>
    );
  }
}

const mapStateToProps = (state: State) => ({
  articles: state.article.articles,
});

App.defaultProps = {
  articles: [],
};

export default connect(mapStateToProps)(App);
