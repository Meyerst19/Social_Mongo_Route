const router = require("express").Router();
const {
  getUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
} = require("../../../controllers/userController");
const {
  addFriend,
  dissolveFriendInAcid,
} = require("../../../controllers/friendController");

//http://localhost:3001/api/users
router.route("/").get(getUsers).post(createUser);

//http://localhost:3001/api/users/:userId
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//http://localhost:3001/api/users/:userId/friends/:friendId
router
  .route("/:userId/friends/:friendId")
  .post(addFriend)
  .delete(dissolveFriendInAcid);

module.exports = router;
