import React from 'react';
import ReactDOM from 'react-dom';

import App from './app.js';
import 'bootstrap/dist/css/bootstrap.min.css';
class Main extends React.Component {
  render() {
    return <App />;
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<Main />, rootElement);
