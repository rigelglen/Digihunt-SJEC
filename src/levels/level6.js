const level6Code = require('../consts').codes[5];
const level5Code = require('../consts').codes[4];
const saveList = require('../consts').saveList;
const path = require('path');

let code = require('../consts').secrets[5];

module.exports = function (app, jsonParser, userState, io) {

    app.get('/level6', (req, res) => {
        if (!req.session.uid) {
            res.redirect(403, '/');
        } else {
            let user = userState.find(x => x.id === req.session.uid);
            if (user && user.levels[4] === level5Code)
                res.sendFile(path.join(__dirname, '../../levels/lvl6.html'));
            else
                res.redirect(403, '/level5');
        }
    });


    app.post('/level6/auth', jsonParser, (req, res) => {
        let foundUser;
        let sessionValid = false;

        for (let i = 0; i < userState.length; i++) {
            if (userState[i].id === req.session.uid) {
                if (req.body.code == code && !userState[i].levels[5]) {
                    userState[i].levels.push(level6Code);
                    var dt = new Date();
                    var utcDate = dt.toUTCString();
                    userState[i]["completed6"] = utcDate;
                }
                saveList(userState, io);
                foundUser = userState[i];
                sessionValid = true;
            }
        }

        if (req.body.code == code && sessionValid) {
            res.send({ 'message': 'Success!!', code: level6Code, userArray: foundUser, id: req.session.uid })
        } else {
            res.status(406);
            res.send({ 'message': 'Fail :(' });
        }
    });




}
