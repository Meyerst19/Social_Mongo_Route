const User = require("../models/User");
const Thought = require("../models/Thought");

module.exports = {
  //http://localhost:3001/api/users
  async getUsers(req, res) {
    try {
      const allUsers = await User.find();
      res.status(200).json(allUsers);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  //http://localhost:3001/api/users/:userId
  async getSingleUser(req, res) {
    try {
      const user = await User.findOne({ _id: req.params.userId })
        .select("-__v")
        .populate("thoughts")
        .populate("friends");

      if (!user) {
        res.status(404).json({ message: "No user found with that id!" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  //http://localhost:3001/api/users
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      res.status(200).json(newUser);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  //http://localhost:3001/api/users/:userId
  async updateUser(req, res) {
    try {
      const user = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { new: true, runValidators: true }
      );

      if (!user) {
        res
          .status(400)
          .json({ message: "If the validations fail, will it come here?" });
      }

      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  //http://localhost:3001/api/users/:userId
  async deleteUser(req, res) {
    //delete remove a user's associated thoughts when deleted
    try {
      const userToDelete = await User.findOne({ _id: req.params.userId });

      const thoughtArray = userToDelete.thoughts;

      console.log(thoughtArray);

      for (i = 0; i < thoughtArray.length; i++) {
        await Thought.findOneAndDelete({ _id: thoughtArray[i] });
      }

      await User.findOneAndDelete({ _id: req.params.userId });

      // for (i = 0; i < thoughtArrayLength; i++) {
      //    console.log(await Thought.findOne({ userToDelete.thoughts[i]})
      // }
      // // const userThoughts = await Thought.find({
      //   username: userToDelete.username,
      // });

      // const deletedThoughts = await Thought.deleteMany({
      //   username: userToDelete.username,
      // });

      // console.log(deletedThoughts);

      res
        .status(200)
        .json({ message: "User deleted and associated thoughts!" });

      // if (userThoughts.length === deletedThoughts) {
      //   const deleteUsed = await findOneAndDelete({ _id: req.params.userId });

      //   res.status(200).json({
      //     message: "User thoughts deleted along with user!",
      //     deletedUser: deleteUserd,
      //   });
      // } else {
      //   res.status(410).json({
      //     message:
      //       "Error number of deleted thoughts does not match with original query!",
      //   });
      // }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
