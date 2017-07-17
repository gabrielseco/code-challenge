import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Article } from './../../components';
import { getArticles } from './../../actions';
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

  renderArticles() {
    return this.props.articles.map(article =>
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

export default connect(mapStateToProps)(App);
