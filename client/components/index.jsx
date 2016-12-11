import React from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, IndexRoute, Link, hashHistory } from 'react-router'
import App from './App';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

ReactDOM.render((
    <Router history={hashHistory}>
      <Route path='/' component={App} />
    </Router>
  ),
	document.getElementById('app')
);
