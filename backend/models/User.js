const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  name: {
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
    validate: {
      is_email: true,
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  age: {
    type: DataTypes.INTEGER,
  },

  skills: [
    {
      type: String,
      trim: true,
    },
  ],
  interest_id: [
    {
      type: DataTypes.INTEGER,
      required: true,
      trim: true,
      references: {
        model: interest,
        key: id,
      },
    },
  ],
  location: [
    {
      type: String,
      required: false,
    },
  ],
  user_type: {
    type: DataTypes.INTEGER,
    required: true,
  },
});

// set up pre-save middleware to create password
userSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("password")) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

const UserProfile = model("UserProfile", userSchema);

module.exports = UserProfile;
