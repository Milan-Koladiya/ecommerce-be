const router = require("express").Router();

const { getprofile, updateUserProfile,deleteUser } = require("../controllers/user.controller");
const multipartyMiddleware = require("connect-multiparty")();
const { varifytoken } = require("../middlewares/auth.middleware")


router.get("/me",varifytoken, multipartyMiddleware, getprofile);
router.put("/me",varifytoken,multipartyMiddleware, updateUserProfile);
router.delete("/me",varifytoken, multipartyMiddleware, deleteUser);



module.exports = router;
