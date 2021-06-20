import React from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import Headers from './Header.js';

import Main from './Main'
export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Headers />
        <Main/>
      </Router>
    );
  }
}
