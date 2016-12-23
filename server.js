import express from 'express';
import http from 'http';

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

app.get('*', (req, res) => {
  res.render('index');
});

const server = http.createServer(app);

server.listen(3000);
server.on('listening', () => {
  console.log('server running at http://localhost:3000');
});