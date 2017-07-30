import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Tag } from './../../components';
import Shared from './../../shared';
import { addArticle } from './../../actions';

import './FormArticle.css';

class FormArticle extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.writeTag = this.writeTag.bind(this);
    this.renderTags = this.renderTags.bind(this);

    this.state = {
      tag: {
        color: '',
        name: '',
      },
      form: {
        title: '',
        author: '',
        excerpt: '',
        content: '',
        published: false,
        tags: [],
      },
    };
  }

  componentWillUpdate(nextProps) {
    if (nextProps.articleMutation) {
      nextProps.history.push('/');
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const { dispatch } = this.props;
    dispatch(addArticle(this.state.form));
  }

  onChange(event) {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  }

  onChangeCheckBox(event) {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.checked,
      },
    });
  }

  onChangeTag(event) {
    this.setState({
      tag: {
        name: event.target.value,
        color: Shared.getColor() || this.state.tag.color,
      },
      form: {
        ...this.state.form,
      },
    });
  }

  writeTag(event) {
    if (event.keyCode !== undefined && event.keyCode === 13) {
      const tags = [
        ...this.state.form.tags,
        { color: this.state.tag.color, name: this.state.tag.name },
      ];
      this.setState({
        tag: {
          color: '',
          name: '',
        },
        form: {
          ...this.state.form,
          tags,
        },
      });
    }
  }

  renderTags() {
    return this.state.form.tags.map((tag, index) => {
      return <Tag key={index} name={tag.name} color={tag.color} />;
    });
  }

  render() {
    return (
      <div className="form-article">
        <h1 className="text-center">Create a new article</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input type="text" onChange={this.onChange} name="title" />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author: </label>
            <input type="text" onChange={this.onChange} name="author" />
          </div>
          <div className="form-group">
            <label htmlFor="excerpt">Excerpt: </label>
            <textarea type="text" onChange={this.onChange} name="excerpt" />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content: </label>
            <textarea type="text" onChange={this.onChange} name="content" />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tags: </label>
            <input type="text" value={this.state.tag.name} onChange={this.onChangeTag} onKeyDown={this.writeTag} name="tag" />
          </div>
          <div className="form-group">
            <label htmlFor="published">Published: </label>
            <input
              type="checkbox"
              onChange={this.onChangeCheckBox}
              name="published"
            />
          </div>
          <div className="tags">
            {this.renderTags()}
          </div>
          <input type="submit" value="SEND" />
        </form>
      </div>
    );
  }
}

FormArticle.propTypes = {
  dispatch: PropTypes.func,
  history: PropTypes.object,
};

const mapStateToProps = state => ({
  articleMutation: state.article.articleMutation,
});

export { FormArticle as FormArticleTesting, mapStateToProps };

export default connect(mapStateToProps)(FormArticle);
