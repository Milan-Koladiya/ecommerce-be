const router = require("express").Router();

const { createSubcategoryController, findSubcategoryCategoryIdWise, updateSubcategory, deleteSubcategory,getAllSubcategory} = require("../controllers/subcategory.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware");


router.post("/",authMiddleware, multipartyMiddleware, createSubcategoryController);
router.get("/",authMiddleware, multipartyMiddleware, findSubcategoryCategoryIdWise);
router.get("/allsubcategory",authMiddleware, multipartyMiddleware, getAllSubcategory);
router.put("/:id",authMiddleware, multipartyMiddleware, updateSubcategory);
router.delete("/:id",authMiddleware, multipartyMiddleware, deleteSubcategory);



module.exports = router;
