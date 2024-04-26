const { Schema, Types } = require("mongoose");
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

const reactionSchema = new Schema(
  {
    _id: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      maxLength: 280,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatDate,
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
