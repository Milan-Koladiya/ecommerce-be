import express from "express"
let subcategoryRoute = express.Router()

const { createSubcategoryController, findSubcategoryCategoryIdWise, updateSubcategory, deleteSubcategory,getAllSubcategory} = require("../controllers/subcategory.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware");


subcategoryRoute.post("/",authMiddleware, multipartyMiddleware, createSubcategoryController);
subcategoryRoute.get("/", multipartyMiddleware, findSubcategoryCategoryIdWise);//remove token verify
subcategoryRoute.get("/allsubcategory", multipartyMiddleware, getAllSubcategory);//remove token verify
subcategoryRoute.put("/:id",authMiddleware, multipartyMiddleware, updateSubcategory);
subcategoryRoute.delete("/:id",authMiddleware, multipartyMiddleware, deleteSubcategory);



module.exports = subcategoryRoute;
