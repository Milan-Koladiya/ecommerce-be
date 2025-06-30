const jwt = require("jsonwebtoken")
import { Request,Response,NextFunction } from "express";
import {AuthRequest} from "../types/authTypes"

const authMiddleware = async (req:AuthRequest, res:Response, next:NextFunction) => {

    try {
        const authheaders = req.headers['authorization'] || req.headers.authorization 
        if(!authheaders){
            return res.status(401).json({ msg: 'Unauthorized user' });

        }
        const token = authheaders.split(" ")[1]

        jwt.verify(token, process.env.SECRET_KEY, (err:any, decode:any) => {
            if (err) {
                return res.status(401).json({ msg: 'Unauthorized user' });
            }
            req.user = decode

            next();

        })
    }
    catch (error) {
        console.log(error)
    }

}

module.exports = {authMiddleware}