const level8Code = require('../consts').codes[7];
const level7Code = require('../consts').codes[6];
const saveList = require('../consts').saveList;
const path = require('path');

let code = require('../consts').secrets[7];

module.exports = function (app, jsonParser, userState, io) {

    app.get('/level8', (req, res) => {
        if (!req.session.uid) {
            res.redirect(403, '/');
        } else {
            let user = userState.find(x => x.id === req.session.uid);
            if (user && user.levels[6] === level7Code)
                res.sendFile(path.join(__dirname, '../../levels/lvl8.html'));
            else
                res.redirect(403, '/level7');
        }
    });


    app.post('/level8/auth', jsonParser, (req, res) => {
        console.log('Code is ' + req.body.code);
        console.log('session' + req.session.uid);
        let foundUser;
        let sessionValid = false;

        for (let i = 0; i < userState.length; i++) {
            if (userState[i].id === req.session.uid) {
                if (req.body.code == code && !userState[i].levels[7])
                    userState[i].levels.push(level8Code);
                saveList(userState, io);
                foundUser = userState[i];
                sessionValid = true;
            }
        }

        if (req.body.code == code && sessionValid) {
            res.send({ 'message': 'Success!!', code: level8Code, userArray: foundUser , id: req.session.uid})
        } else {
            res.status(406);
            res.send({ 'message': 'Fail :(' });
        }
    });




}
