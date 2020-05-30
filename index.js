const express = require('express');
const path = require('path');
const { parseFile, writeToFile } = require('./data/csvParser');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/hello', (req, res) => {
  // Return them as json
  res.json({message: 'Hello World!'});
});

app.post('/api/data', async (req, res) => {
  try {
    const cityData = await parseFile(req.body.city);
    res.json(cityData);
  } catch (error) {
    res.status(404).send('City not found!');
  }
});

app.post('/api/insertData', (req, res) => {
  if (!req.body.data || !req.body.city) {
    res.status(400).send({ error: 'Missing Parameters' });
  }

  try {
    writeToFile(req.body.city, req.body.data);
    res.status(200).send(req.body.data);
  } catch (error) {
    res.status(404).send({ message: 'Not found!', error });
  }
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Coronavirus-Casos listening on ${port}`);