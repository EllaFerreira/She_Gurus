const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const guruSchema = new Schema({
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
  skills: [
    {
      type: String,
      required: true,
   
    },
  ],

  location: {
    type: String,
    required: false,
  },

  user_type: [
    {
      type: String,
      required: true,
    },
  ],
});

guruSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }
  next();
});

guruSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

module.exports = model("Guru", guruSchema);
