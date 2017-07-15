import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import { App, Detail } from './containers';
import { Header, Footer } from './components';
import './index.css';

ReactDOM.render(
  <Router>
    <div className="root">
      <Header />
      <div className="main">
        <Route exact path="/" component={App} />
        <Route path="/detail" component={Detail} />
      </div>
      <Footer />
    </div>
  </Router>,
  document.getElementById('root'),
);
