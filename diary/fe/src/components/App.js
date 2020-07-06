import CollectionList from './CollectionList';
import Day from './Day';
import Header from './Header';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import React, { Component } from 'react';
import store from '../store';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import { loadUser } from '../actions/auth';

export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
    render() {
        return (
            <Provider store={store}>
          <Router>
            <Header />
          <Switch>
            <PrivateRoute exact path="/" component={CollectionList} />
            <PrivateRoute path="/day/" component={Day}/>
            <Route exact path="/login" component={Login} />
          </Switch>
          </Router>
            </Provider>
        );
    }
}

