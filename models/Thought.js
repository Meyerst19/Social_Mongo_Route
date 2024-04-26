const { Schema, model } = require("mongoose");
const Reaction = require("./Reaction");
const { ObjectId } = require("mongoose").Types;

function formatDate(dbDate) {
  const date = new Date(dbDate);
  const d = date.getDate();
  const m = date.getMonth() + 1;
  const y = date.getFullYear();
  const h = date.getHours();
  const min = date.getMinutes();

  if (h === 0) {
    return `${m}/${d}/${y} @ ${h + 1}:${min} AM`;
  } else if (h === 12) {
    return `${m}/${d}/${y} @ ${h}:${min} PM`;
  } else if (h > 12) {
    return `${m}/${d}/${y} @ ${h - 12}:${min} PM`;
  } else {
    return `${m}/${d}/${y} @ ${h}:${min} AM`;
  }
}

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
      get: formatDate,
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
      getters: true,
    },
    id: false,
  }
);

// thoughtSchema.methods.removeReactionId = function (id) {
//   const remainingReactions = [];
//   for (i = 0; i < this.reactions.length; i++) {
//     if (this.reactions[i]._id === id) {
//       remainingReactions;
//     } else {
//       remainingReactions.push(this.reactions[i]);
//     }
//   }
//   return remainingReactions;
// };

thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("thought", thoughtSchema);

module.exports = Thought;
