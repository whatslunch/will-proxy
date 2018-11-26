require('newrelic');
const express = require('express');
const axios = require('axios');
const path = require('path');
const app = express();
const port = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, '/public')));

app.get('/:id', (req, res) => {
  // console.log(req.params);
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/api/overview/:id', (req, res) => {
  console.log(req.params);
  axios.get(`http://localhost:9001/api/overview/${ req.params.id }`)
    .then(response => res.status(200).send(response.data))
    .catch(err => res.status(500).end(err.message));
});

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
