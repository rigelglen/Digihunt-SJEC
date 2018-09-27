const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const saveList = require('./consts').saveList;
const path = require('path');
const app = express();
const jsonParser = bodyParser.json();

const userState = require("./filename.json");
console.log(userState);

app.use(cookieParser());
app.use(session({
    secret: `&1ztmd5C<DN2M!C@$Kob?Nq'{9TYe7`,
    saveUninitialized: true,
    resave: true
}));

app.use(express.static(path.join(__dirname, '../public'),
    { index: false, extensions: ['html'] }));

require('./levels/level1.js')(app, jsonParser, userState);

app.post('/genID', jsonParser, function (req, res) {
    if (!req.session.uid) {
        req.session.uid = req.body.uid;
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
    res.send(`${req.session.uid}`);
})

app.listen(3000);