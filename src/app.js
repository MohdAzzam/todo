import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Headers from './Header.js';
import Main from './Main'
import AppContext from './context/AppContext.js';
import Auth from './context/Auth.js';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <AppContext.Provider>
          <Auth.Provider>
            <Headers />
            <Main />
          </Auth.Provider>
        </AppContext.Provider>
      </Router>
    );
  }
}
