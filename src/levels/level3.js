const level3Code = require('../consts').codes[2];
const level2Code = require('../consts').codes[1];
const saveList = require('../consts').saveList;
const path = require('path');

let code = require('../consts').secrets[2];

module.exports = function (app, jsonParser, userState) {

    app.get('/level3', (req, res) => {
        if (!req.session.uid) {     
            res.redirect(403, '/');
        } else {
            let user = userState.find(x=>x.id === req.session.uid);
            if(user && user.levels[1] === level2Code)
                res.sendFile(path.join(__dirname, '../../levels/lvl3.html'));
            else
                res.redirect(403, '/level2');
        }
    });


    app.post('/level3/auth', jsonParser, (req, res) => {
        console.log('Code is '+req.body.code);
        console.log('session' + req.session.uid);
        let foundUser;
        let sessionValid = false;

        for (let i = 0; i < userState.length; i++) {
            if (userState[i].id === req.session.uid) {
                if (req.body.code == code && !userState[i].levels[2])
                    userState[i].levels.push(level3Code);
                saveList(userState);
                foundUser = userState[i];
                sessionValid = true;
            }
        }

        if (req.body.code == code && sessionValid) {
            res.send({ 'message': 'Success!!', code: level3Code, userArray: foundUser })
        } else {
            res.status(406);
            res.send({ 'message': 'Fail :(' });
        }
    });




}
