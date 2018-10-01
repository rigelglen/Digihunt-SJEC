const express = require('express');
const bodyParser = require('body-parser');
const saveList = require('./consts').saveList;
const path = require('path');
const app = express();
const jsonParser = bodyParser.json();
const cookieSession = require('cookie-session');

const level8Code = require('./consts').codes[7];

let userState = [];
try {
    userState = require("./filename.json");
} catch (e) {
    userState = [];
}

console.log(userState);

let port = process.env.PORT || 8080;

app.use(cookieSession({
    name: 'session',
    keys: [`&1ztmd5C<DN2M!C@$Kob?Nq'{9TYe7`]
}));

app.use(express.static(path.join(__dirname, '../public'),
    { index: false, extensions: ['html'] }));

app.get('/memsync', (req, res) => {
    let userList = [];
    try {
        userList = require('./filename2.json');
    } catch{
        userList = [];
    }

    res.clearCookie("session");
    res.clearCookie("session.sig");

    console.log('Memlist is ' + JSON.stringify(userList, null, 4));
    saveList(userList);
    res.send('<script>localStorage.clear(); window.location = "/"</script>');
});

require('./levels/level1.js')(app, jsonParser, userState);
require('./levels/level2.js')(app, jsonParser, userState);
require('./levels/level3.js')(app, jsonParser, userState);
require('./levels/level4.js')(app, jsonParser, userState);
require('./levels/level5.js')(app, jsonParser, userState);
require('./levels/level6.js')(app, jsonParser, userState);
require('./levels/level7.js')(app, jsonParser, userState);
require('./levels/level8.js')(app, jsonParser, userState);

app.get('/', (req, res) => {
    if (req.session.uid) {
        res.sendFile(path.join(__dirname, '../levels/start-noinput.html'));
        return;
    }
    res.sendFile(path.join(__dirname, '../levels/start.html'));
});

app.get('/gratz', (req, res) => {
    if (!req.session.uid) {
        res.redirect(403, '/');
    } else {
        let user = userState.find(x => x.id === req.session.uid);
        if (user.levels[7] === level8Code)
            res.sendFile(path.join(__dirname, '../levels/gratz.html'));
        else
            res.redirect(403, '/');
    }
});



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
    let response = { id: req.session.uid };
    res.send(response);
})

app.listen(port);