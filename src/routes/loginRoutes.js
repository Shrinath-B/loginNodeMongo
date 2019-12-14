const express = require('express');
const { loginUserController } = require('../controller/loginController.js');

const loginRouter = express.Router();

function router(allowCrossDomain) {

    loginRouter.use(allowCrossDomain);
    loginRouter.route('/')
        .post(loginUserController);

    return loginRouter;

}

module.exports = router;