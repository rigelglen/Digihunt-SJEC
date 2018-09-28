const level2Code = require('../consts').codes[1];
const level1Code = require('../consts').codes[0];
const saveList = require('../consts').saveList;
const path = require('path');

let code = require('../consts').secrets[1];

module.exports = function (app, jsonParser, userState) {

    app.get('/level2', (req, res) => {
        if (!req.session.uid) {     
            res.redirect(403, '/start');
        } else {
            let user = userState.find(x=>x.id === req.session.uid);
            if(user.levels[0] === level1Code)
                res.sendFile(path.join(__dirname, '../../levels/lvl2.html'));
            else
                res.redirect(403, '/level1');
        }
    });


    app.post('/level2/auth', jsonParser, (req, res) => {
        console.log(req.body.code);
        console.log('session' + req.session.uid);
        let foundUser;
        let sessionValid = false;

        for (let i = 0; i < userState.length; i++) {
            if (userState[i].id === req.session.uid) {
                if (req.body.code== code && !userState[i].levels[1])
                    userState[i].levels.push(level2Code);
                saveList(userState);
                foundUser = userState[i];
                sessionValid = true;
            }
        }

        if (req.body.code == code && sessionValid) {
            res.send({ 'message': 'Success!!', code: level2Code, userArray: foundUser })
        } else {
            res.status(406);
            res.send({ 'message': 'Fail :(' });
        }
    });




}
