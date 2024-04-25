const Thought = require("../models/Thought");

module.exports = {
  //http://localhost:3001/api/thoughts/:thoughtId/reactions
  async addToDrama(req, res) {
    try {
      // const overTheTopReaction = await Reaction.create(req.body);
      // const parentThoughtPushReaction = await Thought.findOneAndUpdate(
      //   { _id: req.params.thoughtId },
      //   { $addToSet: { reactions: req.body } },
      //   { runValidators: true }
      // );

      const parentThought = await Thought.findOneAndUpdate(
        {
          _id: req.params.thoughtId,
        },
        {
          $addToSet: {
            reactions: {
              reactionBody: req.body.reactionBody,
              username: req.body.username,
            },
          },
        },
        { runValidators: true, new: true }
      );

      if (!parentThought) {
        res.status(404).json({
          message:
            "Why do you have to be adding to the drama when we couldn't even find a thought with that id?",
        });
      }

      const reactionArrayLength = parentThought.reactionCount;

      const reactionId = parentThought.reactions[reactionArrayLength - 1]._id;

      // const reactionObject = await Reaction.findOne({ _id: reactionId });

      // const pushReaction = await parentThought.addReaction({
      //   reactionBody: req.body.reactionBody,
      //   username: req.body.username,
      // });

      // const connectThoughtWithReacaction = await Thought.findOneAndUpdate(
      //   { _id: req.params.thoughtId },
      //   { $addToSet: { reactions: pushReaction[0]._id } },
      //   { runValidators: true, new: true }
      // );

      // const updatedParentThought = await Thought.findOne({
      //   _id: req.params.thoughtId,
      // });

      res.status(200).json({
        message: "Your reaction has been documented!",
        thoughtWithReaction: parentThought,
        reactionId: reactionId,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  //http://localhost:3001/api/thoughts/:thoughtId/reactions
  async removeYourselfFromDrama(req, res) {
    try {
      // const thoughtWithReaction = await Thought.findOne({
      //   _id: req.params.thoughtId,
      // });

      // const reactionArray = thoughtWithReaction.reactions

      // function findReactionIndex(arr, id) { for (i = 0; i < arr.length; i++) {
      //   if (arr[i]._id === ) {
      //     return i
      //   }
      // }};

      // findReaction

      // const reactionIdex = thoughtWithReaction.findReactionIndex(
      //   req.body.reactionId
      // );

      const thoughtThatStartedIt = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { _id: req.body.reactionId } } },
        { new: true }
      );

      if (!thoughtThatStartedIt) {
        res
          .status(404)
          .json({ message: "Thought with id provied could not be found!" });
      }

      // const beingTheBetterPerson = await Reaction.findOneAndDelete({
      //   _id: req.body.reactionId,
      // });

      // if (!beingTheBetterPerson) {
      //   res.status(404).json({ message: "No reactions found with that id!" });
      // }

      res.status(200).json({
        message: "Your reaction has been removed",
        // deletedReaction: beingTheBetterPerson,
        // thoughtsReactions: thoughtThatStartedIt.reactions,
        remaingReaction: thoughtThatStartedIt.reactions,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
