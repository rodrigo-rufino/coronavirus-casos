const express = require('express');
const path = require('path');
const { parseFile } = require('./data/csvParser');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under '/api'
app.get('/api/hello', (req, res) => {
  // Return them as json
  res.json({message: 'Hello World!'});
});

app.get('/api/data', async (req, res) => {
  res.json(await parseFile());
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Coronavirus-Casos listening on ${port}`);