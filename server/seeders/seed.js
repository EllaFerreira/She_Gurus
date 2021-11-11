const db = require("../config/connection");
const { Student, Guru } = require("../models");
const guruSeeds = require("./guruSeeds.json");
const studentSeeds = require("./studentSeeds.json");

db.once("open", async () => {
  try {
    await Guru.deleteMany({});
    await Student.deleteMany({});

    await Guru.create(guruSeeds);
    await Student.create(studentSeeds);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log("all done!");
  process.exit(0);
});
