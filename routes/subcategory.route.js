const router = require("express").Router();

const { createSubcategoryController, findSubcategoryCategoryIdWise, updateSubcategory, deleteSubcategory } = require("../controllers/subcategory.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { varifytoken } = require("../middlewares/auth.middleware")


router.post("/",varifytoken, multipartyMiddleware, createSubcategoryController);
router.get("/",varifytoken, multipartyMiddleware, findSubcategoryCategoryIdWise);
router.put("/:id",varifytoken, multipartyMiddleware, updateSubcategory);
router.delete("/:id",varifytoken, multipartyMiddleware, deleteSubcategory);



module.exports = router;
