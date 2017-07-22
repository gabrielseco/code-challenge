import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Article } from './../../components';
import { getArticles, deleteArticle } from './../../actions';
import './App.css';

class App extends Component {
  // definition
  constructor(props) {
    super(props);
    this.renderArticles = this.renderArticles.bind(this);
    this.onRemove = this.onRemove.bind(this);
  }

  // lifecycle
  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(getArticles());
  }

  onRemove(article) {
    const { dispatch } = this.props;
    dispatch(deleteArticle(article));
  }

  renderArticles() {
    return this.props.articles.map(article =>
      <Article key={article.id} data={article} onRemove={this.onRemove} />,
    );
  }

  // Renders
  render() {
    if (this.props.articles.length > 0) {
      return (
        <div className="articles">
          {this.renderArticles()}
        </div>
      );
    }
    return (
      <div className="no-results">
        <p>Nothing to see here</p>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  articles: state.article.articles,
});

App.defaultProps = {
  articles: [],
};

App.propTypes = {
  articles: PropTypes.arrayOf(PropTypes.object),
  dispatch: PropTypes.func,
};

export { App as AppTesting, mapStateToProps };

export default connect(mapStateToProps)(App);
