const router = require("express").Router();
const {
  mindReadAll,
  mindReadSingleThought,
  createThought,
  manipulateThought,
  obliterateThought,
} = require("../../../controllers/thoughtController");
const {
  addToDrama,
  removeYourselfFromDrama,
} = require("../../../controllers/reactionController");

//http://localhost:3001/api/thoughts
router.route("/").get(mindReadAll).post(createThought);

//http://localhost:3001/api/thoughts/:thoughtId
router
  .route("/:thoughtId")
  .get(mindReadSingleThought)
  .put(manipulateThought)
  .delete(obliterateThought);

//http://localhost:3001/api/thoughts/:thoughtId/reactions
router
  .route("/:thoughtId/reactions")
  .post(addToDrama)
  .delete(removeYourselfFromDrama);

//http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:thoughtId/reactions/:reactionId");

module.exports = router;
