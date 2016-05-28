const path = require('path');
const express = require('express');
const async = require('asyncawait/async');
const await = require('asyncawait/await');

const { authenticate, profileInfo, waterInfo, waterGoal } = require('./fitbit_api');
const { calculateTimeOfNextBlast } = require('./schedule');

const app = express();


app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/fitbit', async (function(req, res) {
  const authInfo = await (authenticate(req.query));

  const [profile, info, goal] = await (Promise.all([
    profileInfo(authInfo),
    waterInfo(authInfo),
    waterGoal(authInfo)
  ]));

  console.log('GOAL', goal);
  console.log("INFO", info);

  // We need to calculate the time of the next water blast.
  calculateTimeOfNextBlast(info, goal)

}));

app.post('/fire', (req, res) => {
  // TODO: Implement firing logic!

  res.json({ fired: true })
});

app.listen(3000);
