const { Schema, model } = require("mongoose");

const userMatcher = new Schema({
  user_matcher: {
    type: String,
    required: true,
    trim: true,
    primaryKey: true,
    allowNull: false,
    timestamps: true,
    modelName: "user_matcher",
    freezeTableName: true,
  },
});

const UserMatcher = model("UserMatcher", userMatcherSchema);

module.exports = UserMatcher;
