import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { App, Detail } from './containers';
import { Header, Footer } from './components';
import './index.css';

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <div className="root">
        <Header />
        <div className="main">
          <Route exact path="/" component={App} />
          <Route path="/detail/:id" component={Detail} />
        </div>
        <Footer />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
