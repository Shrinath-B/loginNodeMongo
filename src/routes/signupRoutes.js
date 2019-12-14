const express = require('express');
const { signUpUser } = require('../controller/signupController.js');

const signupRouter = express.Router();

function router(allowCrossDomain) {

    signupRouter.use(allowCrossDomain);

    signupRouter.route('/')
        .post(signUpUser)

    return signupRouter;

}

module.exports = router;