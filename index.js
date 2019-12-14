const express = require('express');
const debug = require('debug')('app');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const config = require('./src/config/config.js');

const app = express();

app.use(morgan('tiny'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}

mongoose.connect(config.getDBString())
    .then(() => debug(`Connected to MongoDB...`))
    .catch((err) => debug(`Could not connect to MongoDB... ${err}`));

const mainRouter = require('./src/routes/mainRoutes.js')(allowCrossDomain);

app.use(config.API_PATH, mainRouter);

app.listen(config.PORT, () => {
    debug(`listening to port ${config.PORT}`);
});
