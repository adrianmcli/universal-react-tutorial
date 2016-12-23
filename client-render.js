import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router';

import routes from './routes';

import createBrowserHistory from 'history/lib/createBrowserHistory';

const App = <Router routes={routes} history={createBrowserHistory()} />;
const rootEl = document.getElementById('app');

ReactDOM.render(App, rootEl);
