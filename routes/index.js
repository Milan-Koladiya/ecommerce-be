const router = require('express').Router();

const authRoute = require('./auth.route');
const usersRoute = require('./user.route');

router.use("/auth", authRoute);
router.use("/users", usersRoute);
               

module.exports = router;