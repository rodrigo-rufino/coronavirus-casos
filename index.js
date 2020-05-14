const express = require('express');
const path = require('path');
const { parseFile } = require('./data/csvParser');
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
  console.log(req.body.city);
  try {
    const cityData = await parseFile(req.body.city);
    res.json(cityData);
  } catch (error) {
    console.log(error);
    res.status(404).send('City not found!');
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