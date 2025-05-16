const router = require("express").Router();

const { createCategoryController, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");
const multipartyMiddleware = require("connect-multiparty")();

router.post("/", multipartyMiddleware, createCategoryController);
router.get("/", getAllCategory);
router.put("/:id", multipartyMiddleware, updateCategory);
router.delete("/:id", multipartyMiddleware, deleteCategory);


module.exports = router;
