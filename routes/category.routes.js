const router = require("express").Router();

const { createCategoryController, getAllCategory, updateCategory, deleteCategory } = require("../controllers/category.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


router.post("/", authMiddleware,multipartyMiddleware, createCategoryController);
router.get("/",authMiddleware, getAllCategory);
router.put("/:id",authMiddleware,multipartyMiddleware, updateCategory);
router.delete("/:id",authMiddleware, multipartyMiddleware, deleteCategory);


module.exports = router;
