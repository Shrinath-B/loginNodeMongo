const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const UserDetails = require('../model/UserDetails.js');

exports.loginUserService = (req, res) => {
    const hashedPwd = crypto.createHmac('sha256', req.body.userName)
        .update(req.body.password)
        .digest('hex');
    signInUser(req.body, hashedPwd).then(userInfo => {
        if (userInfo && userInfo.length) {
            jwt.sign({ userDetails: req.body }, req.body.userName, { algorithm: 'HS256' }, (err, token) => {
                res.json({ token });
            });
        } else {
            res.send('User not found!');
        }
    });
}

async function signInUser(userInfo, hashedPwd) {
    return await UserDetails
        .find()
        .and([{ userName: userInfo.userName }, { password: hashedPwd }])
        .select({ userName: 1 });
}