const JWT = require("jsonwebtoken");
const knex = require("../knex");
const bcrypt = require("bcrypt-as-promised");
const APP_SECRET = "SUPERSECRETAPPSECRET";

function generateToken(user, secret) {
    var u = {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        username: user.username,
        email: user.email
    };

    return token = JWT.sign(u, secret, {
        expiresIn: 60 * 60 * 24 // expires in 24 hours
    });
}

function getUser(username, email) {
    return knex("users")
        .select("*")
        .where("username", username)
        .orWhere("email", email).then((data) => {
            return data
        });
}

function hashPassword(passwordForHash, salt) {
    return bcrypt.hash(passwordForHash, salt).then((hashedPassword) => {
        return hashedPassword;
    });
}

function authenticateAndJWT(user) {
    if (user !== undefined) {
        var token = generateToken({
            id: user.id,
            username: user.username,
            email: user.email
        }, APP_SECRET);

        return {jwt: token, authenticated: true};
    } else {
        return {authenticated: false};
    }
}

module.exports = {
    generateToken,
    getUser,
    hashPassword,
    authenticateAndJWT
};
