const connection = require("../config/connection");
const { User } = require("../models");

connection.once("error", (err) => err);

connection.once("open", async () => {
  console.log("connected");
  let thoughtCheck = await connection.db
    .listCollections({ name: "thoughts" })
    .toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection("thoughts");
  }
  let userCheck = await connection.db
    .listCollections({ name: "users" })
    .toArray();
  if (userCheck.length) {
    await connection.dropCollection("users");
  }

  const users = [
    {
      username: "user1",
      email: "user1@email.com",
    },
    {
      username: "user2",
      email: "user2@email.com",
    },
    {
      username: "user3",
      email: "user3@email.com",
    },
    {
      username: "user4",
      email: "user5@email.com",
    },
    {
      username: "user6",
      email: "user7@email.com",
    },
    {
      username: "user7",
      email: "user7@email.com",
    },
    {
      username: "user8",
      email: "user8@email.com",
    },
    {
      username: "user9",
      email: "user9@email.com",
    },
    {
      username: "user10",
      email: "user10@email.com",
    },
  ];

  await User.insertMany(users);

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
