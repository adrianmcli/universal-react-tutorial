import express from 'express';
import http from 'http';

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';

import routes from './routes';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  // matches a set of routes to a location, without rendering,
  // and calls a callback when it's done.
  match({ routes, location: req.url }, (err, redirectLocation, renderProps) => {
    // 4 possibilities:
    // 1. an error occured, respond with 500
    // 2. ReactRouter redirect, so trigger a redirect from the server
    // 3. Valid component found for the given route, use renderProps
    //    to render the app and convert it to a string to be passed
    //    into the EJS template
    // 4. Route not found, respond with 404
    if (err) {
      res.status(500).send(err.message);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const markup = renderToString(<RouterContext {...renderProps} />);
      console.log(markup);
      res.render('index', { markup });
    } else {
      res.sendStatus(404);
    }
  });
});

const server = http.createServer(app);

server.listen(3000);
server.on('listening', () => {
  console.log('server running at http://localhost:3000');
});
