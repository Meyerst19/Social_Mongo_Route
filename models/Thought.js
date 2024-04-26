const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");
const { ObjectId } = require("mongoose").Types;

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      minLength: 1,
      maxLength: 280,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    username: {
      type: String,
      required: true,
    },
    reactions: [Reaction],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema.methods.removeReactionId = function (id) {
  const remainingReactions = [];
  for (i = 0; i < this.reactions.length; i++) {
    if (this.reactions[i]._id === id) {
      remainingReactions;
    } else {
      remainingReactions.push(this.reactions[i]);
    }
  }
  return remainingReactions;
};

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
