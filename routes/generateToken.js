const JWT = require("jsonwebtoken");

function generateToken(user, secret) {
    var u = {
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
    };

    return token = JWT.sign(u, secret, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

module.exports = generateToken;
