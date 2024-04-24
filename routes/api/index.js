const router = require("express").Router();
const userRoutes = require("./users");
const thoughRoutes = require("./thoughts");

//http://localhost:3001/api/users
router.use("/users", userRoutes);

//http://localhost:3001/api/thoughts
router.use("/thoughts", thoughRoutes);

module.exports = router;
