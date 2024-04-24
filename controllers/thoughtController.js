const Thought = require("../models/Thought");
const User = require("../models/User");

module.exports = {
  //http://localhost:3001/api/thoughts
  async mindReadAll(req, res) {
    try {
      const allHumanThoughts = await Thought.find();
      res.status(200).json(allHumanThoughts);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  //http://localhost:3001/api/thoughts/:thoughtId
  async mindReadSingleThought(req, res) {
    try {
      const sigularThought = await Thought.findOne({
        _id: req.params.thoughtId,
      }).populate("reactions");

      if (!sigularThought) {
        res.status(404).json({
          message:
            "Serve could not hear your thoughts. No thought found with that id!",
        });
      }

      res.status(200).json(sigularThought);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  //http://localhost:3001/api/thoughts
  async createThought(req, res) {
    try {
      const bestThought = await Thought.create(req.body);
      const congradulateUserForThinking = await User.findOneAndUpdate(
        { username: bestThought.username },
        { $addToSet: { thoughts: bestThought._id } },
        { new: true }
      );
      res.status(200).json({
        message: "Thought created and added to users thoughts array",
        newThought: bestThought,
        user: congradulateUserForThinking,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  //http://localhost:3001/api/thoughts/:thoughtId
  async manipulateThought(req, res) {
    try {
      const jediMindTrick = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: { thoughtText: req.body.thoughtText } },
        { new: true }
      );

      if (!jediMindTrick) {
        res.status(404).json("Think again, no thought found with that id!");
      }

      res.status(200).json(jediMindTrick);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
  //http://localhost:3001/api/thoughts/:thoughtId
  async obliterateThought(req, res) {
    try {
      const makeUserForgetFirst = await Thought.findOne({
        _id: req.params.thoughtId,
      }).username;
      if (!makeUserForgetFirst) {
        res.status(404).json({
          message:
            "No thought found with that id! I don't know what I was thinking.",
        });
      }
      const forgetfullUser = await User.findOneAndUpdate(
        {
          username: makeUserForgetFirst,
        },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
      );

      if (!forgetfullUser) {
        res.status(404).json({
          message:
            "Database controls failure. Username found on thought record, but User record could not be found.",
          username: makeUserForgetFirst,
        });
      }

      const mindWipe = await Thought.findOneAndDelete({
        _id: req.params.thoughtId,
      });

      res.status(200).json({
        message:
          "Screentime has obliterated thought and any record of it on the user model has been erased.",
        removed: mindWipe,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
