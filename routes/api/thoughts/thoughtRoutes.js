const router = require("express").Router();
const {
  mindReadThoughts,
  mindReadSingleThought,
  createThought,
  manipulateThought,
  obliterateThought,
} = require("../../../controllers/thoughtController");

//http://localhost:3001/api/thoughts
router.route("/").get(mindReadThoughts).post(createThought);

//http://localhost:3001/api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(mindReadSingleThought)
  .put(manipulateThought)
  .delete(obliterateThought);

module.exports = router;
