const router = require("express").Router();

const { getprofile, updateUserProfile } = require("../controllers/user.controller");
const multipartyMiddleware = require("connect-multiparty")();

router.post("/me", multipartyMiddleware, getprofile);
router.put("/me", multipartyMiddleware, updateUserProfile);
router.post("/me", multipartyMiddleware, getprofile);



module.exports = router;
