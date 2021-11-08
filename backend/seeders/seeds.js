const db = require("../config/connection");
const { userProfile: User, Interest, UserMatcher } = require("../models");
const userSeeds = require("./userSeeds.json");
const interestSeeds = require("./interestSeeds.json");
const userMatchSeeds = require("./userMatchSeeds.json");

db.once("open", async () => {
  try {
    await User.deleteMany({});
    await User.create(userSeeds);

    await interestSeeds.deleteMany({});
    await interestSeeds.create(interestSeeds);

    await userMatchSeeds.deleteMany({});
    await userMatchSeeds.create(userMatchSeeds);

    console.log("all seeds included!");
    process.exit(0);
  } catch (err) {
    throw err;
  }
});
