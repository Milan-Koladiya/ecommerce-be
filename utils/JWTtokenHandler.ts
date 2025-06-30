import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

const secret_key:any=process.env.SECRET_KEY

function createTokenPair(payload:any) {
    const accessToken = jwt.sign(payload, secret_key, { expiresIn: "1w" });
    return accessToken;
    // return {
    //     accessToken: jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "1w" }), refreshToken: jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: "4w" }),
    // };
}

function verifyToken(token:any) {
    return jwt.verify(token,secret_key);
}


module.exports = { createTokenPair, verifyToken }