const User = require("../models/User");

module.exports = {
  //http://localhost:3001/api/users/:userId/friends/:friendId
  async addFriend(req, res) {
    try {
      const usersNewFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );

      if (!usersNewFriend) {
        res.status(404).json({ message: "No user found with that id!" });
      }

      const newFriendOfUser = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $addToSet: { friends: req.params.userId } },
        { new: true }
      );

      if (!newFriendOfUser) {
        res.status(404).json({
          message: "No friend found with that id!",
        });
      }
      res.status(200).json({
        message: "New friend connection made",
        userFriends: usersNewFriend.friends,
        friendsFriends: newFriendOfUser.friends,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  //http://localhost:3001/api/users/:userId/friends/:friendId
  async dissolveFriendInAcid(req, res) {
    try {
      const userDissolvingFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { new: true }
      );

      if (!userDissolvingFriend) {
        res.status(404).json({ message: "No user found with that id!" });
      }

      const friendDissolvedByUser = await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId } },
        { new: true }
      );

      if (!friendDissolvedByUser) {
        res.status(404).json({
          message:
            "Could not find the friend you wanted to dissolve in a bucket of acid with that id!",
        });
      }

      res.status(200).json({
        message: "You have dissolved your friend in acid",
        usersRemainingFriends: userDissolvingFriend.friends,
        dissolvedFriendFriends: friendDissolvedByUser.friends,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
