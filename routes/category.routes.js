const router = require("express").Router();

const { createCategoryController, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { varifytoken } = require("../middlewares/auth.middleware")


router.post("/", varifytoken,multipartyMiddleware, createCategoryController);
router.get("/",varifytoken, getAllCategory);
router.put("/:id",varifytoken,multipartyMiddleware, updateCategory);
router.delete("/:id",varifytoken, multipartyMiddleware, deleteCategory);


module.exports = router;
