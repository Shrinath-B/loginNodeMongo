const express = require('express');
const debug = require('debug')('app');

const mainRouter = express.Router();

function router(allowCrossDomain) {

    mainRouter.use(allowCrossDomain);

    const loginRouter = require('./loginRoutes.js')(allowCrossDomain);
    const signupRouter = require('./signupRoutes.js')(allowCrossDomain);

    mainRouter.use('/login', loginRouter);
    mainRouter.use('/signup', signupRouter);

    return mainRouter;
}

module.exports = router;