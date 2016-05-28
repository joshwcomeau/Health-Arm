const express = require('express');

const app = express();


// Structure:
// We will have a single GET route, that returns a very basic web interface.
// The web interface will have a form that POSTs to /fire, which launches
// the projectile.
//
// Later: we will have the ability to set timers.
// Fire every X hours starting at Y O'clock.
// Maybe use node-cron for this?
// We'll need a model, Schedules, that stores the currently-registered schedules.

app.get('')

app.get('/', (req, res) => {
  res.sendFile('index.html')
});


app.listen(3000)
