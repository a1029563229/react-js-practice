import React from 'react';
import { Provider } from "react-redux";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import "reset.css";
import './App.css';
import Home from './Home/Home';
import Login from './Login/Login';
import store from "../store/store";

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path="/home" component={Home} />
            <Route path="/login" component={Login} />
            <Redirect to="/home/main" />
          </Switch>
        </Router>
      </Provider>
    )
  }
}

export default App;
