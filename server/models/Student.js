const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");
const Match = require("./Match");

const studentSchema = new Schema({
  surname: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, "Must match an email address!"],
    // validate: {
    //   is_email: true,
    // },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  age: {
    type: Number,
  },
  photo: {
    type: String,
    default: "../public/placeholder.png",
  },

  location: {
    type: String,
    required: false,
  },
  user_type: {
    type: String,
    required: true,
  },
  matchs: [Match.schema],
});

// set up pre-save middleware to create password
studentSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
studentSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model("Student", studentSchema);
