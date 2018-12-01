require('newrelic');
const axios = require('axios');
const path = require('path');
const proxy = require('http-proxy-middleware');

const express = require('express');
const app = express();

const compress = require('compression');
app.use(compress());

app.use(express.static(path.join(__dirname, '/public')));

app.get('/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api//reservations', (req, res) => {
  axios.get('http://34.216.238.63/api/4689cca8-5498-45e3-8761-ab3ce1962358/reservations')
    .then(resp => res.status(200).send(resp.data))
    .catch(err => res.status(500).end(err.message));
});

app.use('/api/overview/:id', //will
  proxy({
    target: 'http://54.144.31.20',
    changeOrigin: true
  })
);


app.use('/api/:id/', //brian
  proxy({
    target: 'http://3.16.143.18',
    changeOrigin: true
  })
);

app.use('/restaurants/:id', //mina
  proxy({
    target: 'http://18.223.247.137:2000',
    changeOrigin: true
  })
);

const port = process.env.PORT || 9000;
app.listen(port, () => {
  console.log(`server running at: http://someplace:${port}`);
});
