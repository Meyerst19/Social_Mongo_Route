const router = require("express").Router();
const userRoutes = require("./userRoutes");

//http://localhost:3001/api/users
router.use("/", userRoutes);

module.exports = router;
