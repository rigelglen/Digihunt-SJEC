const level1Code = require('../consts').codes[0];
const saveList = require('../consts').saveList;
const path = require('path');

let code = require('../consts').secrets[0];

module.exports = function (app, jsonParser, userState, io) {
    app.get('/level1', (req, res) => {
        if (!req.session.uid) {
            res.redirect(403, '/');
        } else {
            res.sendFile(path.join(__dirname, '../../levels/lvl1.html'));
        }
    });


    app.post('/level1/auth', jsonParser, (req, res) => {
        console.log(req.body.code);
        console.log('session' + req.session.uid);
        let foundUser;
        let sessionValid = false;

        for (let i = 0; i < userState.length; i++) {
            if (userState[i].id === req.session.uid) {
                if (!userState[i].levels[0] && req.body.code == code)
                    userState[i].levels.push(level1Code);
                saveList(userState, io);
                foundUser = userState[i];
                sessionValid = true;
            }
        }

        if (req.body.code == code && sessionValid) {
            res.send({ 'message': 'Success!!', code: level1Code, userArray: foundUser, id: req.session.uid})
        } else {
            res.status(406);
            res.send({ 'message': 'Fail :(' });
        }
    });


}
