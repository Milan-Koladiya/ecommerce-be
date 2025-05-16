const router = require('express').Router();

const authRoute = require('./auth.route');
const usersRoute = require('./user.route');
const categoryRoute = require('./category.routes');
const subcategoryRoute = require('./subcategory.route');

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/categories", categoryRoute);
router.use("/subcategories", subcategoryRoute);
               

module.exports = router;