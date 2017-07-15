// @flow
import React, { Component } from 'react';
import { request, ARTICLES_QUERY } from './../../graphql';
import { Article } from './../../components';
import { Article as IArticle } from './../../types';
import './App.css';

class App extends Component {
  // definition
  constructor(props) {
    super(props);
    this.renderArticles = this.renderArticles.bind(this);
    this.state = {
      articles: [],
    };
  }

  // lifecycle
  componentWillMount() {
    request(ARTICLES_QUERY).then(response => {
      this.setState({ articles: response.data.articles });
    });
  }

  renderArticles() {
    return this.state.articles.map((article: IArticle) =>
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

export default App;
