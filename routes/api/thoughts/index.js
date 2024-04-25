const router = require("express").Router();
const thoughtRoutes = require("./thoughtRoutes");

//http://localhost:3001/api/thoughts
router.use("/", thoughtRoutes);

module.exports = router;
