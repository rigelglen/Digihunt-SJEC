const express = require('express');
const bodyParser = require('body-parser');
const saveList = require('./consts').saveList;
const path = require('path');
const app = express();
const jsonParser = bodyParser.json();
const cookieSession = require('cookie-session');
const fs = require('fs');
const http = require('http').Server(app);
const io = require('socket.io')(http);

const level7Code = require('./consts').codes[6];
const secret = 'abcd1234';

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

app.get('/memsync/:secret', (req, res) => {
    if (req.params.secret === secret) {
        let userList = [];
        try {
            userList = require('./filename2.json');
        } catch{
            userList = [];
        }

        res.clearCookie("session");
        res.clearCookie("session.sig");

        console.log('Memlist is ' + JSON.stringify(userList, null, 4));
        saveList(userList, io);
        res.send('<script>localStorage.clear(); window.location = "/"</script>');
    }
    else {
        res.redirect(403, '/');
    }
});

app.post('/memparse/:secret', jsonParser, (req, res) => {
    if (req.params.secret === secret) {
        let userList = [];
        console.log('DATA ISSSSSSS' + JSON.stringify(req.body.jsonData, null, 4));
        try {
            userList = req.body.jsonData;
        } catch{
            userList = [];
        }

        console.log('Memlist is ' + JSON.stringify(userList, null, 4));
        saveList(userList, io);
        res.sendStatus(200);
    }
    else {
        res.redirect(403, '/');
    }
});

require('./levels/level1.js')(app, jsonParser, userState, io);
require('./levels/level2.js')(app, jsonParser, userState, io);
require('./levels/level3.js')(app, jsonParser, userState, io);
require('./levels/level4.js')(app, jsonParser, userState, io);
require('./levels/level5.js')(app, jsonParser, userState, io);
require('./levels/level6.js')(app, jsonParser, userState, io);
require('./levels/level7.js')(app, jsonParser, userState, io);

app.get('/', (req, res) => {
    let hasFound = false;
    for (let i = 0; i < userState.length; i++) {
        if (req.session.uid && userState[i].id === req.session.uid) {
            hasFound = true;
        }
    }
    if (hasFound) {
        res.sendFile(path.join(__dirname, '../levels/start-noinput.html'));
        return;
    }
    res.clearCookie('session');
    res.clearCookie('session.sig');
    res.sendFile(path.join(__dirname, '../levels/start.html'));
});

app.get('/gratz', (req, res) => {
    if (!req.session.uid) {
        res.redirect(403, '/');
    } else {
        let user = userState.find(x => x.id === req.session.uid);
        if (user && user.levels[6] === level7Code)
            res.sendFile(path.join(__dirname, '../levels/gratz.html'));
        else
            res.redirect(403, '/');
    }
});

app.get('/skipCompleted', (req, res) => {
    if (req.session.uid) {
        let hasFound = false;
        let foundUser;
        for (let i = 0; i < userState.length; i++) {
            if (req.session.uid && userState[i].id == req.session.uid) {
                hasFound = true;
                foundUser = userState[i];
            }
        }
        if (hasFound) {
            if(foundUser.levels.length+1<=7)
                res.redirect(`/level${foundUser.levels.length+1}`);
            else{
                res.redirect('/gratz');
            }
        } else {
            res.sendStatus(404);
        }
    } else {
        res.redirect(200, "/");
    }
})

app.get('/getLevels/:userID', (req, res) => {
    let hasFound = false;
    let response = { userArray: [] }
    for (let i = 0; i < userState.length; i++) {
        if (req.params.userID && userState[i].id == req.params.userID) {
            hasFound = true;
            response = { userArray: userState[i] }
        }
    }
    if (hasFound) {
        res.send(response);
    } else {
        res.sendStatus(404);
    }
});

app.get('/logout', jsonParser, (req, res) => {
    if (req.session.uid) {
        res.clearCookie("session");
        res.clearCookie("session.sig");
        res.clearCookie("io");
        res.send('<script>localStorage.clear(); window.location = "/"</script>');
    } else {
        res.redirect(200, "/");
    }
});

app.get('/dash/:secret', (req, res) => {
    if (req.params.secret === secret) {
        res.sendFile(path.join(__dirname, '../levels/dash.html'));
    } else {
        res.redirect(403, '/');
    }
});

app.get('/wipe/:secret', (req, res) => {
    if (req.params.secret === secret) {
        fs.writeFileSync("src/filename.json", JSON.stringify([], null, 4), "utf8");
        fs.writeFileSync("src/filename2.json", JSON.stringify([], null, 4), "utf8");
        userState = [];
        res.redirect(200, '/');
    } else {
        res.redirect(403, '/');
    }
});

app.post('/genID', jsonParser, (req, res) => {
    let userArr = []

    if (!req.session.uid) {
        req.session.uid = req.body.uid;
        let hasFound = false;
        for (let i = 0; i < userState.length; i++) {
            if ((userState[i].id == req.body.uid)) {
                hasFound = true;
                userArr = userState[i]
            }

        }
        if (userState.length === 0 || !hasFound) {
            userState.push({
                id: req.body.uid,
                levels: []
            });
            saveList(userState, io);
        }
    }
    let response = { id: req.session.uid, userArray: userArr };
    res.send(response);
});

io.on('connection', function (socket) {
    console.log('a user connected');
    io.sockets.emit('userUpdate', JSON.stringify(userState));

    socket.on('disconnect', function () {
        console.log('user disconnected');
    });
});


http.listen(port, () => {
    console.log(`Listening on port ${port}`);
});