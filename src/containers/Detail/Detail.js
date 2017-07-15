// @flow
import React, { Component } from 'react';
import './Detail.css';

class Detail extends Component {
  // definition
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
    };
  }

  // lifecycle
  componentWillMount() {
  }

  // Renders
  render() {
    return (
      <div>
        <h2>hola</h2>
      </div>
    );
  }
}

export default Detail;
