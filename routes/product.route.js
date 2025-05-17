const router = require("express").Router();

const { createProduct, getSingleProduct ,updateProduct,deleteProduct,filterProduct} = require("../controllers/product.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { upload } = require("../middlewares/multer.middleware")


router.post("/", upload.single('file'), createProduct);
router.get("/:id", getSingleProduct);
router.put("/:id", upload.single('file'), updateProduct);
router.delete("/:id",multipartyMiddleware, deleteProduct);
router.post("/filter", upload.single('file'),filterProduct);

module.exports = router;
