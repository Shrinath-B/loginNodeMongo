const { loginUserService } = require('../services/loginService.js');

exports.loginUserController = function (req, res) {
    loginUserService(req, res);
}