const router = require("express").Router();
const {
  addFriend,
  dissolveFriendInAcid,
} = require("../../../controllers/friendController");

//http://localhost:3001/api/users/:userId/friends/:friendId
router.route("/:friendId").put(addFriend).delete(dissolveFriendInAcid);

module.exports = router;
