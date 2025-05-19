const jwt = require("jsonwebtoken");

function createTokenPair(payload) {
    const accessToken = jwt.sign(payload, process.env.SECREAT_KEY, {
        expiresIn: "1h"
    });
    return accessToken;
}


module.exports = { createTokenPair }