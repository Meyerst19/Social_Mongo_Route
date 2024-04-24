const { Schema, model } = require("mongoose");
const Thought = require("./Thought");

const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: "Email address is required",
      unique: true,
      validate: [validateEmail, "Please provide a valid email address"],
      match: [
        /^[a-zA-Z0-9. _%+-]+@[a-zA-Z0-9. -]+\\. [a-zA-Z]{2,}$/,
        "Please provide a valid email address",
      ],
    },
    thoughts: [Thought],
    friends: [User],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model("user", userSchema);

module.exports = User;
