import express from "express"
let categoryRoute = express.Router()

const { createCategoryController, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


categoryRoute.post("/", authMiddleware,multipartyMiddleware, createCategoryController);
categoryRoute.get("/", getAllCategory);//remove token verify
categoryRoute.put("/:id",authMiddleware,multipartyMiddleware, updateCategory);
categoryRoute.delete("/:id",authMiddleware, multipartyMiddleware, deleteCategory);


module.exports = categoryRoute;
