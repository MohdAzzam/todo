import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Headers from './Header.js';
import Main from './Main'
import AppContext from './context/AppContext.js';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <AppContext.Provider>
          <Headers />
          <Main />
        </AppContext.Provider>
      </Router>
    );
  }
}
