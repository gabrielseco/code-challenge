import React, { Component } from 'react';
import './FormArticle.css';


class FormArticle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: {
        title: '',
      },
    };
  }

  onSubmit(event) {
    event.preventDefault();
    this.setState({});
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
