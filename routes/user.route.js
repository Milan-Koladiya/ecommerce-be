const router = require("express").Router();

const { getprofile, updateUserProfile,deleteUser } = require("../controllers/user.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { authMiddleware } = require("../middlewares/auth.middleware")


router.get("/me",authMiddleware, multipartyMiddleware, getprofile);
router.put("/me",authMiddleware,multipartyMiddleware, updateUserProfile);
router.delete("/me",authMiddleware, multipartyMiddleware, deleteUser);



module.exports = router;
