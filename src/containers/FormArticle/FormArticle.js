// @flow
import React, { Component } from 'react';
import './FormArticle.css';

type State = {
  form: {
    title: string
  }
};

class FormArticle extends Component {
  constructor(props: any) {
    super(props);
    this.state = {
      form: {
        title: '',
      },
    };
  }
  state: State;

  onSubmit(event: any) {
    event.preventDefault();
    this.setState({});
  }

  onChange(event: any) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  props: any;

  render() {
    return (
      <div>
        <h1 className="text-center">Create a new article</h1>
        <form onSubmit={() => this.onSubmit}>
          <label htmlFor="title">Title: </label>
          <input type="text" onChange={() => this.onChange} name="title" />
          <input type="submit" value="SEND" />
        </form>
      </div>
    );
  }
}

export default FormArticle;
