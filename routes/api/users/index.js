const router = require("express").Router();
const friendRoutes = require("./friendsRoutes");
const userRoutes = require("./userRoutes");

//http://localhost:3001/api/users
router.use("/", userRoutes);

//http://localhost:3001/api/users/:userId/friends
router.use("/:userId/friends", friendRoutes);

module.exports = router;
