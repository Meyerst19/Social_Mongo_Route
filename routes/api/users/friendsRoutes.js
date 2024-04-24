const router = require("express").Router();
const {
  addFriend,
  removeFriend,
} = require("../../../controllers/friendController");

//http://localhost:3001/api/users/:userId/friends/:friendId
router.route("/:friendId").put(addFriend).delete(removeFriend);

module.exports = router;
