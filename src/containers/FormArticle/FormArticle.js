// @flow
import React, { Component } from 'react';
import './FormArticle.css';

type State = {
  form: {
    title: string,
  }
};

class FormArticle extends Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.state = {
      form: {},
    };
  }
  state: State

  onSubmit(event) {
    event.preventDefault();
    this.form = {};
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  render() {
    return (
      <div>
        <h1 className="text-center">Create a new article</h1>
        <form onSubmit={this.onSubmit}>
          <label htmlFor="title">Title: </label>
          <input type="text" onChange={this.onChange} name="title" />
          <input type="submit" value="SEND" />
        </form>
      </div>
    );
  }
}

export default FormArticle;

