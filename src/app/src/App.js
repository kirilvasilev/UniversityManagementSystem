import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './state/store';
import {BrowserRouter, Route, Switch} from "react-router-dom";


import Header from './components/Header/Header';
import CourseOverviewContainer from './containers/CourseOverviewContainer';
import Footer from './components/Footer/Footer';
import LoginContainer from './containers/LoginContainer';
import Signup from './components/Signup/Signup';


class App extends Component {
  
  requireAuth() {
    // console.log(this.props.auth)
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app-container">
            <Header/>
            <Switch>
              <Route path="/login" component={LoginContainer}/>
              <Route path="/signup" component={Signup}/>
              <Route path="/" component={CourseOverviewContainer} onEnter={this.requireAuth()}/>
            </Switch>
            <Footer/>
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

export default App;
