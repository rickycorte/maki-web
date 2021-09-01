import React from 'react';
import ReactDOM from 'react-dom';
import './index.sass';
import reportWebVitals from './reportWebVitals';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import DocsPage from './DocsPage';
import SearchPage from './SearchPage';
import HomePage from './HomePage';

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Switch>
          <Route path="/docs">
            <DocsPage />
          </Route>
          <Route path="/search">
            <SearchPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
