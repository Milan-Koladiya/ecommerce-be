const jwt = require("jsonwebtoken");

function createTokenPair(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1w" });
    return accessToken;
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}


module.exports = { createTokenPair, verifyToken }