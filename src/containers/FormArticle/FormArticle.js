import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Tag } from './../../components';
import shared from './../../shared';

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
    this.onRemove = this.onRemove.bind(this);

    this.state = {
      tag: {
        color: '',
        name: '',
      },
      form: {
        id: null,
        title: '',
        author: '',
        excerpt: '',
        content: '',
        published: false,
        tags: [],
      },
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.article !== undefined) {
      this.setState({
        ...this.state,
        form: nextProps.article,
      });
    }
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.onSubmit(this.state.form);
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
        color: this.state.tag.color || shared.getColor(),
      },
      form: {
        ...this.state.form,
      },
    });
  }

  onRemove(evt) {
    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        tags: [
          ...this.state.form.tags.slice(0, evt.index),
          ...this.state.form.tags.slice(evt.index + 1),
        ],
      },
    });
  }

  writeTag(event) {
    if (
      event.keyCode !== undefined &&
      event.keyCode === 13 &&
      this.state.tag.name !== ''
    ) {
      event.preventDefault();
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
      return (
        <Tag
          key={index}
          index={index}
          name={tag.name}
          color={tag.color}
          onRemove={this.onRemove}
        />
      );
    });
  }

  render() {
    const buttonText = this.props.edit ? 'Update' : 'Send';
    return (
      <div className="form-article">
        {!this.props.edit
          ? <h1 className="text-center">Create a new article</h1>
          : <h1 className="text-center">Editing article</h1>}
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title: </label>
            <input
              type="text"
              onChange={this.onChange}
              name="title"
              value={this.state.form.title}
            />
          </div>
          <div className="form-group">
            <label htmlFor="author">Author: </label>
            <input
              type="text"
              onChange={this.onChange}
              name="author"
              value={this.state.form.author}
            />
          </div>
          <div className="form-group">
            <label htmlFor="excerpt">Excerpt: </label>
            <textarea
              type="text"
              onChange={this.onChange}
              name="excerpt"
              value={this.state.form.excerpt}
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content: </label>
            <textarea
              type="text"
              onChange={this.onChange}
              name="content"
              value={this.state.form.content}
            />
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tags: </label>
            <input
              type="text"
              value={this.state.tag.name}
              onChange={this.onChangeTag}
              onKeyDown={this.writeTag}
              name="tag"
            />
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
          <input type="submit" value={buttonText} />
        </form>
      </div>
    );
  }
}

FormArticle.propTypes = {
  article: PropTypes.object,
  edit: PropTypes.bool,
  onSubmit: PropTypes.func.isRequired,
};

export default FormArticle;
