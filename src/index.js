const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bodyParser = require('body-parser');
const makeid = require('./consts');

const path = require('path');
const app = express();
const jsonParser = bodyParser.json();

const userState = [];

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

        for (let i = 0; i < userState.length; i++) {
            if (!(userState[i].id === req.body.uid) && req.body.uid != '') {
                userState.push({
                    id: req.body.uid,
                    levels: []
                });
            }
        }

        if (userState.length === 0) {
            userState.push({
                id: req.body.uid,
                levels: []
            });
        }


    }
    console.log(userState)
    res.send(`${req.session.uid}`);
})

app.listen(3000);