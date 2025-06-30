import express from "express"
let adminRoute = express.Router()

const { getBuyer, getSeller, getDashboardSummery } = require("../controllers/admin.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


adminRoute.get("/get_buyer", authMiddleware, getBuyer);
adminRoute.get("/get_seller", authMiddleware, getSeller);
adminRoute.get("/dashboard", authMiddleware, getDashboardSummery);

module.exports = adminRoute;
