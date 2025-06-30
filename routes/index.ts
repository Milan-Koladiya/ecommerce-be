import express from "express"

const authRoute = require('./auth.route');
const usersRoute = require('./user.route');
const categoryRoute = require('./category.routes');
const subcategoryRoute = require('./subcategory.route');
const productRoute = require('./product.route');
const cartRoute = require('./cart.routes');
const orderRoute = require('./order.route');
const adminRoute=require("./admin.route");
const paymentRoute=require("./payment.route");

const router=express.Router()

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/categories", categoryRoute);
router.use("/subcategories", subcategoryRoute);
router.use("/product", productRoute);
router.use("/cart", cartRoute);
router.use("/orders", orderRoute);
router.use("/admin", adminRoute);
router.use("/payments", paymentRoute);
               

module.exports=router