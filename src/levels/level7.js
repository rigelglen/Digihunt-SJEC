const level7Code = require('../consts').codes[6];
const level6Code = require('../consts').codes[5];
const saveList = require('../consts').saveList;
const path = require('path');

let code = require('../consts').secrets[6];

module.exports = function (app, jsonParser, userState, io) {

    app.get('/level7', (req, res) => {
        if (!req.session.uid) {
            res.redirect(403, '/');
        } else {
            let user = userState.find(x => x.id === req.session.uid);
            if (user && user.levels[5] === level6Code)
                res.sendFile(path.join(__dirname, '../../levels/lvl7.html'));
            else
                res.redirect(403, '/level6');
        }
    });


    app.post('/level7/auth', jsonParser, (req, res) => {
        let foundUser;
        let sessionValid = false;

        for (let i = 0; i < userState.length; i++) {
            if (userState[i].id === req.session.uid) {
                if (req.body.code == code && !userState[i].levels[6]) {
                    userState[i].levels.push(level7Code);
                    var dt = new Date();
                    var utcDate = dt.toUTCString();
                    userState[i].completionTime = utcDate;
                }
                saveList(userState, io);
                foundUser = userState[i];
                sessionValid = true;
            }
        }

        if (req.body.code == code && sessionValid) {
            res.send({ 'message': 'Success!!', code: level7Code, userArray: foundUser, id: req.session.uid })
        } else {
            res.status(406);
            res.send({ 'message': 'Fail :(' });
        }
    });




}
