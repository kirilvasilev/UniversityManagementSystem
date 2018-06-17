import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './state/store';

import Header from './components/Header/Header';
import CourseOverviewContainer from './containers/CourseOverviewContainer';
import Footer from './components/Footer/Footer';


class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="app-container">
          <Header/>
          <CourseOverviewContainer/>          
          <Footer/>
        </div>
      </Provider>
    );
  }
}

export default App;
