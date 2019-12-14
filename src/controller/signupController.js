const { signupUser } = require('../services/signupService');

exports.signUpUser = function (req, res) {
    const responseJson = {
        usernameInvalid: false,
        emailInvalid: false,
        created: false
    }
    signupUser(req, res, responseJson);
}