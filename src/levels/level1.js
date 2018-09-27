const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const level1Code = require('../consts').codes[0];
let code = 123456;

module.exports = function (app, jsonParser, userState) {
    app.post('/level1/auth', jsonParser, (req, res) => {
        console.log(req.body.code);
        let foundUser;
        let sessionValid = false;
        for (let i = 0; i < userState.length; i++) {
            if (userState[i].id === req.session.uid) {
                if (!userState[i].levels[0])
                    userState[i].levels.push(level1Code);
                foundUser = userState[i];
                sessionValid = true;
            }
        }

        if (parseInt(req.body.code) === code && sessionValid) {
            res.send({ 'message': 'Success!!', code: level1Code, userArray: foundUser })
        } else {
            res.send({ 'message': 'Fail :(' })
        }
    });
}
