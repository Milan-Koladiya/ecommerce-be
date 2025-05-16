const router = require("express").Router();

const { createSubcategoryController, findSubcategoryCategoryIdWise, updateSubcategory, deleteSubcategory } = require("../controllers/subcategory.controller");
const multipartyMiddleware = require("connect-multiparty")();

router.post("/", multipartyMiddleware, createSubcategoryController);
router.get("/", multipartyMiddleware, findSubcategoryCategoryIdWise);
router.put("/:id", multipartyMiddleware, updateSubcategory);
router.delete("/:id", multipartyMiddleware, deleteSubcategory);



module.exports = router;
