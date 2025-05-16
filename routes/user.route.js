const router = require("express").Router();

const { getprofile, updateUserProfile,deleteUser } = require("../controllers/user.controller");
const multipartyMiddleware = require("connect-multiparty")();

router.post("/me", multipartyMiddleware, getprofile);
router.put("/me", multipartyMiddleware, updateUserProfile);
router.delete("/me", multipartyMiddleware, deleteUser);



module.exports = router;
