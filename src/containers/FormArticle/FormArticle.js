import React, { Component } from 'react';
import './FormArticle.css';

class FormArticle extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeCheckBox = this.onChangeCheckBox.bind(this);
    this.onChangeTag = this.onChangeTag.bind(this);
    this.renderTags = this.renderTags.bind(this);

    this.state = {
      tag: '',
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

  onSubmit(event) {
    event.preventDefault();
    this.setState({});
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
      tag: event.target.value,
      form: {
        ...this.state.form,
      },
    });
    if (event.keyCode !== undefined && event.keyCode === 13) {
      const tags = [...this.state.form.tags, event.target.value];
      this.setState({
        tag: '',
        form: {
          ...this.state.form,
          tags,
        },
      });
    }
  }

  renderTags() {
    return this.state.form.tags.map((tag, index) => <p key={index}>{tag}</p>);
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
            <input type="text" value={this.state.tag} onChange={this.onChangeTag} onKeyDown={this.onChangeTag} name="tag" />
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

export default FormArticle;
