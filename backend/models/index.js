const UserProfile = require("./User");
const UserMatcher = require("./UserMatcher");
const Interest = require("./Interest");

UserProfile.belongsTo(Interest, {
  foreignKey: "interest_id",
});

Interest.hasMany(UserProfile, {
  foreignKey: "interest_id",
});

UserProfile.belongsToMany(UserProfile, {
  through: UserMatcher,
  as: "match",
});
module.exports = { UserProfile, Interest, UserMatcher };
