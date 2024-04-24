const Reaction = require("../models/Reaction");
const Thought = require("../models/Thought");

module.exports = {
  //http://localhost:3001/api/thoughts/:thoughtId/reactions
  async addToDrama(req, res) {
    try {
      const overTheTopReaction = await Reaction.create(req.body);
      const thoughtSpillingTea = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: overTheTopReaction._id } },
        { new: true }
      );

      if (!thoughtSpillingTea) {
        res.status(404).json({
          message:
            "Why you have ot be adding to the drama when we couldn't even find a thought with that id!",
        });
        res.status(200).json(overTheTopReaction);
      }
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  //http://localhost:3001/api/thoughts/:thoughtId/reactions/:reactionId
  async removeYourselfFromDrama(req, res) {
    try {
      const thoughtThatStartedIt = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      );

      if (!thoughtThatStartedIt) {
        res
          .status(404)
          .json({ message: "Thought with id provied could not be found!" });
      }

      const beingTheBetterPerson = await Reaction.findOneAndDelete({
        _id: req.params.reactionId,
      });

      if (!beingTheBetterPerson) {
        res.status(404).json({ message: "No reactions found with that id!" });
      }

      res.status(200).json({
        deletedReaction: beingTheBetterPerson,
        thoughtsRemaingReactions: thoughtThatStartedIt.reactions,
      });
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
