import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getArticle } from './../../actions';
import { Tag } from './../../components';
import shared from './../../shared';
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

  renderTags() {
    if (this.props.article.tags !== undefined) {
      return this.props.article.tags.map((tag, index) =>
        <Tag key={index} index={index} name={tag.name} color={shared.getColor()} />,
      );
    }
    return null;
  }

  // Renders
  render() {
    if (this.props.article === undefined || this.props.article === null) {
      return <div>Loading</div>;
    }
    return (
      <div className="detail">
        <h2 className="title text-center">
          {this.props.article.title}
        </h2>
        <p className="author text-center">
          By: {this.props.article.author}
        </p>
        <p className="content text-center">
          {this.props.article.content}
        </p>
        <p className="published text-center">
          Published: {this.props.article.published ? 'Yes' : 'No'}
        </p>
        <div className="tags">
          {this.renderTags()}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  article: state.article.article,
});

Detail.propTypes = {
  article: PropTypes.object,
  dispatch: PropTypes.func,
  match: PropTypes.object,
};

export { Detail as DetailTesting, mapStateToProps };

export default connect(mapStateToProps)(Detail);
