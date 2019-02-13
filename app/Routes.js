import React from 'react';
import { Switch, Route } from 'react-router';
import routes from './constants/routes';
import App from './containers/App';
import HomePage from './containers/HomePage';
import CounterPage from './containers/CounterPage';
import Header from './components/header/Header'

export default () => (
  <App>
    <Header title="AVD Manager UI" />
    <Switch>
      <Route path={routes.HOME} component={HomePage} />
    </Switch>
  </App>
);
