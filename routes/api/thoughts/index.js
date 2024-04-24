const router = require("express").Router();
const reactionRoutes = require("./reactionRoutes");
const thoughtRoutes = require("./thoughtRoutes");

//http://localhost:3001/api/thoughts
router.use("/", thoughtRoutes);

//http://localhost:3001/api/thoughts/:thoughtId/reactions
router.use("/:thoughId/reactions", reactionRoutes);

module.exports = router;
