const router = require("express").Router();
const {
  addToDrama,
  removeYourselfFromDrama,
} = require("../../../controllers/reactionController");

//http://localhost:3001/api/thoughts/:thoughtId/reactions
router.route("/").post(addToDrama);

//http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
router.route("/:reactionId").delete(removeYourselfFromDrama);

module.exports = router;
