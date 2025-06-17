const jwt = require("jsonwebtoken");

function createTokenPair(payload) {
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1w" });
    return accessToken;
    // return {
    //     accessToken: jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1w" }), refreshToken: jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "4w" }),
    // };
}

function verifyToken(token) {
    return jwt.verify(token, process.env.SECRET_KEY);
}


module.exports = { createTokenPair, verifyToken }