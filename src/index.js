const express = require('express');
const bodyParser = require('body-parser');
const saveList = require('./consts').saveList;
const path = require('path');
const app = express();
const jsonParser = bodyParser.json();
var cookieSession = require('cookie-session')

const userState = require("./filename.json");
console.log(userState);

let port = process.env.PORT || 8080;

app.use(cookieSession({
    name: 'session',
    keys: [`&1ztmd5C<DN2M!C@$Kob?Nq'{9TYe7`]
  }))  

app.use(express.static(path.join(__dirname, '../public'),
    { index: false, extensions: ['html'] }));


require('./levels/level1.js')(app, jsonParser, userState);
require('./levels/level2.js')(app, jsonParser, userState);

app.get('/start', (req, res) => {
    if(req.session.uid){
        res.sendFile(path.join(__dirname, '../levels/start-noinput.html'));
    }
    res.sendFile(path.join(__dirname, '../levels/start.html'));
})

app.post('/genID', jsonParser, (req, res) => {
    if (!req.session.uid) {
        req.session.uid = parseInt(req.body.uid);
        let hasFound = false;
        for (let i = 0; i < userState.length; i++) {
            if ((userState[i].id === parseInt(req.body.uid))) {
                hasFound = true;
            }

        }
        if (userState.length === 0 || !hasFound) {
            userState.push({
                id: req.body.uid,
                levels: []
            });
            saveList(userState);
        }
    }
    console.log(userState)
    let response = { id: req.session.uid };
    res.send(response);
})

app.listen(port);