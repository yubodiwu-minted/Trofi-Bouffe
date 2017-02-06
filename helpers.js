const JWT = require("jsonwebtoken");
const knex = require("./knex");
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

var isVolumeUnit = (unit) => {
    if (unit.indexOf("tbsp") !== -1 || unit.indexOf("cup") !== -1 || unit.indexOf("mL") !== -1 || unit.indexOf("tsp") !== -1 || unit.indexOf("L") !== -1) {
        return true;
    } else {
        return false;
    }
};

var isWeightUnit = (unit) => {
    if (unit.indexOf("oz") !== -1 || unit.indexOf("lbs") !== -1) {
        return true;
    } else {
        return false;
    }
};

var convertUnitsFromTo = (fromUnit, toUnit) => {
    var convertTable = {
        g: {
            g: 1,
            oz: 16 / 453.592,
            lbs: 1 / 453.5921
        },
        oz: {
            g: 28.3495,
            oz: 1,
            lbs: 1/16
        },
        lbs: {
            g: 453.592,
            oz: 16,
            lbs: 1
        },
        tsp: {
            tsp: 1,
            tbsp: 1 / 3,
            cup: 1 / 48
        },
        tbsp: {
            tsp: 3,
            tbsp: 1,
            cup: 1 / 16
        },
        cup: {
            tsp: 48,
            tbsp: 16,
            cup: 1
        }
    };

    if (fromUnit.indexOf("cup") !== -1) {
        fromUnit = "cup";
    } else if (fromUnit.indexOf("tsp") !== -1) {
        fromUnit = "tsp";
    } else if (fromUnit.indexOf("tbsp") !== -1) {
        fromUnit = "tbsp";
    }

    return convertTable[fromUnit][toUnit];
}

var filterForWeightOrVolumeRequirement = (data) => {
    return data.filter((ingredient) => {
        if (ingredient.needsWeight) {
            return ingredient.hasWeight;
        } else if (ingredient.needsVolume) {
            return ingredient.hasVolume;
        }
    });
}

var combineNutritionFacts = (data) => {
    return data.reduce((accum, cur) => {
        var multiplier = cur.recipeQuantity / cur.serving_quantity * convertUnitsFromTo(cur.serving_unit, cur.recipeUnits);

        for (let key in accum) {
            accum[key] = accum[key] + cur[key] * multiplier;
        }

        return accum;
    });
}

module.exports = {
    generateToken,
    getUser,
    hashPassword,
    authenticateAndJWT,
    isWeightUnit,
    isVolumeUnit,
    convertUnitsFromTo,
    filterForWeightOrVolumeRequirement,
    combineNutritionFacts
};
