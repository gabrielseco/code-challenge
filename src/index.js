import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, withRouter, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';

import { AddArticle, App, Detail, EditArticle, NotFound } from './containers';
import { Button, Header, Footer, ScrollToTop } from './components';
import './index.css';

const store = configureStore();

const RouterButton = withRouter(Button);

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <ScrollToTop>
        <div className="root">
          <Header />
          <div className="main">
            <div className="add-btn fixed">
              <RouterButton
                icon="plus"
                size="2x"
                onClick={evt => evt.history.push('/article/add')}
              />
            </div>
            <Switch>
              <Route exact path="/" component={App} />
              <Route path="/detail/:id" component={Detail} />
              <Route path="/article/add" component={AddArticle} />
              <Route path="/article/edit/:id" component={EditArticle} />
              <Route component={NotFound} />
            </Switch>
          </div>
          <Footer />
        </div>
      </ScrollToTop>
    </Router>
  </Provider>,
  document.getElementById('root'),
);
