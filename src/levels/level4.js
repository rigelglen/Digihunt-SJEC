const level4Code = require('../consts').codes[3];
const level3Code = require('../consts').codes[2];
const saveList = require('../consts').saveList;
const path = require('path');

let code = require('../consts').secrets[3];

module.exports = function (app, jsonParser, userState) {

    app.get('/level4', (req, res) => {
        if (!req.session.uid) {     
            res.redirect(403, '/start');
        } else {
            let user = userState.find(x=>x.id === req.session.uid);
            if(user && user.levels[2] === level3Code)
                res.sendFile(path.join(__dirname, '../../levels/lvl4.html'));
            else
                res.redirect(403, '/level3');
        }
    });


    app.post('/level4/auth', jsonParser, (req, res) => {
        console.log('Code is '+req.body.code);
        console.log('session' + req.session.uid);
        let foundUser;
        let sessionValid = false;

        for (let i = 0; i < userState.length; i++) {
            if (userState[i].id === req.session.uid) {
                if (req.body.code == code && !userState[i].levels[3])
                    userState[i].levels.push(level4Code);
                saveList(userState);
                foundUser = userState[i];
                sessionValid = true;
            }
        }

        if (req.body.code == code && sessionValid) {
            res.send({ 'message': 'Success!!', code: level4Code, userArray: foundUser })
        } else {
            res.status(406);
            res.send({ 'message': 'Fail :(' });
        }
    });




}
