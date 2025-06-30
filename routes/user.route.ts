import express from "express"
let usersRoute = express.Router()

const { getprofile, updateUserProfile,deleteUser } = require("../controllers/user.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")

usersRoute.get("/me",authMiddleware, multipartyMiddleware, getprofile);
usersRoute.put("/me",authMiddleware,multipartyMiddleware, updateUserProfile);
usersRoute.delete("/me",authMiddleware, multipartyMiddleware, deleteUser);

module.exports = usersRoute;
