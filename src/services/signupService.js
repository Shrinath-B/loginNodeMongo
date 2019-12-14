const crypto = require('crypto');
const UserDetails = require('../model/UserDetails.js');

exports.signupUser = (req, res, responseJson) => {
    existingUserCheck(req.body).then(userExists => {
        if (!userExists.length) {
            const hashedPwd = crypto.createHmac('sha256', req.body.userName)
                .update(req.body.password)
                .digest('hex');
            createUser(req.body, hashedPwd).then(result => {
                responseJson.created = true;
                res.send(responseJson);
            })
        } else {
            if (userExists[0].userName === req.body.userName) {
                responseJson.usernameInvalid = true;
            } else {
                responseJson.emailInvalid = true;
            }
            res.send(responseJson);
        }
    });
}

async function existingUserCheck(userInfo) {
    return await UserDetails
        .find()
        .or([{ userName: userInfo.userName }, { email: userInfo.email }])
        .select({ userName: 1, email: 1 });
}
async function createUser(userInfo, hashedPwd) {
    const userDetail = new UserDetails({
        userName: userInfo.userName,
        password: hashedPwd,
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        gender: userInfo.gender,
        dateofbirth: userInfo.dateofbirth,
        phoneNumber: userInfo.phoneNumber,
        email: userInfo.email
    });
    return await userDetail.save();
}