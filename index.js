const path = require('path');
const express = require('express');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const { authenticate, profileInfo, waterInfo } = require('./fitbit_api');

const app = express();


app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/fitbit', async (function(req, res) {
  const authInfo = await (authenticate(req.query));

  const profile = await (profileInfo(authInfo));
  const water = await (waterInfo(authInfo));

  console.log("Got profile", profile);
  console.log("Water", water)



}));

app.post('/fire', (req, res) => {
  // TODO: Implement firing logic!

  res.json({ fired: true })
});

app.listen(3000);
