const router = require("express").Router();

const { createSubcategoryController, findSubcategoryCategoryIdWise, updateSubcategory, deleteSubcategory } = require("../controllers/subcategory.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


router.post("/",authMiddleware, multipartyMiddleware, createSubcategoryController);
router.get("/",authMiddleware, multipartyMiddleware, findSubcategoryCategoryIdWise);
router.put("/:id",authMiddleware, multipartyMiddleware, updateSubcategory);
router.delete("/:id",authMiddleware, multipartyMiddleware, deleteSubcategory);



module.exports = router;
