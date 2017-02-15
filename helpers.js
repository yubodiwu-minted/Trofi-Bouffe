const JWT = require("jsonwebtoken");
const knex = require("./knex");
const bcrypt = require("bcryptjs");
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
    if (unit.indexOf("oz") !== -1 || unit.indexOf("lbs") !== -1 || unit === "g" || unit === "grams") {
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
        console.log(ingredient);
        if (ingredient.needsWeight) {
            return ingredient.hasWeight || ingredient.serving_weight_grams;
        } else if (ingredient.needsVolume) {
            return ingredient.hasVolume;
        }
    });
}

var combineNutritionFacts = (data) => {
    console.log(data);
    return data.reduce((accum, cur) => {
        if (cur.needsWeight && !isWeightUnit(cur.serving_unit)) {
            var multiplier = cur.recipeQuantity / cur.serving_weight_grams * convertUnitsFromTo(cur.recipeUnits, "g");
        } else {
            var multiplier = cur.recipeQuantity / cur.serving_quantity * convertUnitsFromTo(cur.recipeUnits, cur.serving_unit);
        }

        for (let key in accum) {
            accum[key] = accum[key] + cur[key] * multiplier;
        }

        return accum;
    }, {
        calories: 0,
        calories_from_fat: 0,
        total_fat: 0,
        saturated_fat: 0,
        monounsaturated_fat: 0,
        polyunsaturated_fat: 0,
        trans_fatty_acid: 0,
        cholesterol: 0,
        sodium: 0,
        total_carbohydrate: 0,
        dietary_fiber: 0,
        sugars: 0,
        protein: 0,
        vitamin_a_dv: 0,
        vitamin_c_dv: 0,
        calcium_dv: 0,
        iron: 0,
        potassium: 0
    });
};

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
