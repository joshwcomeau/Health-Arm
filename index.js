const express = require('express');
const path = require("path");
const app = express();
const request = require('request');
const async = require('asyncawait/async');
const await = require('asyncawait/await');
const { CLIENT_ID, CLIENT_SECRET } = require('./secrets.js')


app.use(express.static('client'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './index.html'));
});


app.get('/fitbit', async (function(req, res) {
  console.log("QUERY", req.query)

  const fitbitTokenData = await (requestAccessToken(req.query));

  // We want to immediately query and see what their current water logs are
  console.log("TOKEN DATA", fitbitTokenData);
}));

app.post('/fire', (req, res) => {
  // TODO: Implement firing logic!

  res.json({ fired: true })
});

function requestAccessToken({ code }) {
  // We need to create a Base64-encoded string of the auth code
  // with our client secret.
  const stringToEncode = [CLIENT_ID, CLIENT_SECRET].join(':');

  const encodedString = new Buffer(stringToEncode).toString('base64')

  return new Promise((resolve, reject) => {
    // Exchange the auth code for an access token
    request({
      url: 'https://api.fitbit.com/oauth2/token',
      method: 'post',
      form: {
        code: code,
        grant_type: 'authorization_code',
        client_id: CLIENT_ID
      },
      headers: {
        'Authorization': `Basic ${encodedString}`,
        'Content-Type': 'application/x-www-form-encoded'
      }
    }, (err, res) => {
      console.log("Request done", err, res);
      if (err) return reject(err);
      return resolve(res.body);
    })

  })
}


app.listen(3000);
