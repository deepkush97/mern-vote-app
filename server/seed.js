require("dotenv").config();
const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = global.Promise;

mongoose.connect(
  process.env.DATABASE,
  { useUnifiedTopology: true, useNewUrlParser: true },
  () => {
    console.log("Database connected");
  }
);
const db = require("./models");
const poll = require("./models/poll");

const users = [
  { username: "username", password: "password" },
  { username: "kelvin", password: "password" },
];

const polls = [
  {
    question: "Which is the best javascript framework?",
    options: ["Angular", "React", "VueJS"],
  },
  {
    question: "Which is the best Language?",
    options: ["Python", "C/C++", "Java"],
  },
  {
    question: "Which season you love?",
    options: ["Rainy", "Summer", "Winter"],
  },
];

const seed = async () => {
  try {
    await db.User.remove();
    console.log("Dropping all Users");
    await db.Poll.remove();
    console.log("Dropping all Polls");

    await Promise.all(
      users.map(async (user) => {
        const data = await db.User.create(user);
        await data.save();
      })
    );
    console.log("Created Users", JSON.stringify(users));

    await Promise.all(
      polls.map(async (poll) => {
        poll.options = poll.options.map((option) => ({ option, votes: 0 }));
        const data = await db.Poll.create(poll);
        const user = await db.User.findOne({ username: "username" });
        data.user = user;
        user.polls.push(data._id);
        await user.save();
        await data.save();
      })
    );

    console.log("Created Polls", JSON.stringify(polls));
  } catch (err) {
    console.error(err);
  }
};

seed();
