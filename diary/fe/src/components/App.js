import DayList from "./day/list/DayList";
import DayDetail from "./day/detail/DayDetail";
import Alerts from "./common/Alerts";
import Header from "./layout/Header";
import Login from "./auth/Login";
import PrivateRoute from "./common/PrivateRoute";
import React, { Component } from "react";
import store from "../store";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { Provider } from "react-redux";
import { loadUser } from "../actions/auth";
import { transitions, positions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

// optional configuration
const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: "30px",
  // you can also just use 'scale'
  transition: transitions.SCALE,
};
export default class App extends Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }
  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...options}>
          <Router>
            <Header />
            <Alerts />
            <Switch>
              <PrivateRoute exact path="/" component={DayList} />
              <PrivateRoute path="/day/" component={DayDetail} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}
